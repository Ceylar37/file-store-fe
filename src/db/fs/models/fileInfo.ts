import { Schema, model, models } from 'mongoose';

export interface FileInfo {
  name: string;
  userId: string;
  directoryId: string | null;
  fileId: string;
}

const FileInfoSchema = new Schema<FileInfo>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  directoryId: { type: String },
  fileId: { type: String, required: true },
});

const fileInfoModel = models.FileInfo || model('FileInfo', FileInfoSchema);

export default fileInfoModel;
