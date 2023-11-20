import * as fs from 'fs'
import { MongoGridFS } from 'mongo-gridfs'
import mongoose, { PipelineStage } from 'mongoose'
import { Readable } from 'stream'

import { CreateDirectoryDto } from './dto/createDirectory'
import { CreateFileDto } from './dto/createFile'
import { DirectoryDto } from './dto/directory'
import { FileDto } from './dto/file'
import { ReadFileDto } from './dto/readFile'
import { ReadableFileDto } from './dto/readableFile'
import { UserDirectoryDto } from './dto/userDirectory'
import directoryModel from './models/directory'
import fileInfoModel from './models/fileInfo'

const createDirectory = async (
  dto: CreateDirectoryDto
): Promise<DirectoryDto> => {
  await checkDirectoryId({
    userId: dto.userId,
    directoryId: dto.directoryId,
  });
  const directoryDirectories = await getDirectoryDirectories(
    dto.directoryId,
    dto.userId
  );
  if (directoryDirectories.some(d => d.name === dto.name))
    throw new Error(
      `Directory with name: ${dto.name} already exist in this directory`
    );
  const createdDirectory = new directoryModel(dto);
  const createdDirectoryFromDB = await createdDirectory.save();
  return {
    id: createdDirectoryFromDB._id.toString(),
    directoryId: createdDirectoryFromDB.directoryId,
    name: createdDirectoryFromDB.name,
  };
};

const checkDirectoryId = async (dto: UserDirectoryDto) => {
  if (!dto.directoryId) return true;

  const aggregationConfig: PipelineStage[] = [
    {
      $match: {
        userId: dto.userId,
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
      },
    },
  ];
  const directories = await directoryModel.aggregate(aggregationConfig);
  if (!directories.some(d => d.id.toString() === dto.directoryId))
    throw new Error(`Directory with id:${dto.directoryId} not found`);

  return true;
};

const getDirectoryDirectories = async (
  directoryId: string | undefined,
  userId: string
): Promise<FileDto[]> => {
  const aggregationConfig: PipelineStage[] = [
    {
      $match: {
        directoryId,
        userId,
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
      },
    },
  ];

  return directoryModel.aggregate(aggregationConfig);
};

const getDirectoryFiles = async (
  directoryId: string | undefined,
  userId: string
): Promise<FileDto[]> => {
  const aggregationConfig: PipelineStage[] = [
    {
      $match: {
        directoryId,
        userId,
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
      },
    },
  ];

  return fileInfoModel.aggregate(aggregationConfig);
};

const createFile = async (dto: CreateFileDto): Promise<ReadableFileDto> => {
  await checkDirectoryId({
    userId: dto.userId,
    directoryId: dto.directoryId,
  });
  const directoryFiles = await getDirectoryFiles(dto.directoryId, dto.userId);
  if (directoryFiles.some(f => f.name === dto.name))
    throw new Error(
      `File with name: ${dto.name} already exist in this directory`
    );
  console.log(dto);
  const oldPath = dto.file.filepath;
  const buffer = fs.readFileSync(oldPath);
  const stream = Readable.from(buffer);
  const fsModel = new MongoGridFS(mongoose.connections[0].db, 'file-store');
  const createdFile = await fsModel.writeFileStream(stream, {
    filename: dto.name,
  });
  const createdFileInfo = new fileInfoModel({
    name: dto.name,
    userId: dto.userId,
    directoryId: dto.directoryId,
    fileId: createdFile._id,
  });
  const createdFileInfoFromDB = await createdFileInfo.save();
  return {
    id: createdFileInfoFromDB._id.toString(),
    name: createdFileInfoFromDB.name,
    directoryId: createdFileInfoFromDB.directoryId,
  };
};

const getUserFiles = async (id: string) => {
  const aggregationConfig: PipelineStage[] = [
    {
      $match: {
        userId: id,
        directoryId: null,
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        directoryId: 1,
      },
    },
  ];

  const files = await fileInfoModel.aggregate(aggregationConfig);
  const directories = await directoryModel.aggregate(aggregationConfig);
  return {
    files,
    directories,
  };
};

const getDirectoryContent = async (dto: UserDirectoryDto) => {
  await checkDirectoryId(dto);

  return {
    files: await getDirectoryFiles(dto.directoryId, dto.userId),
    directories: await getDirectoryDirectories(dto.directoryId, dto.userId),
  };
};

const readFile = async (dto: ReadFileDto) => {
  const fileInfo = await fileInfoModel.findById(dto.id);
  if (fileInfo?.userId !== dto?.userId) {
    throw new Error('Forbidden');
  }
  const fsModel = new MongoGridFS(mongoose.connections[0].db, 'file-store');
  return fsModel.readFileStream(fileInfo.fileId);
};

const fsService = {
  createDirectory,
  getDirectoryDirectories,
  checkDirectoryId,
  createFile,
  getUserFiles,
  getDirectoryContent,
  readFile,
};

export default fsService;
