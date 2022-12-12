import { DirectoryDto } from './directory';
import { FileDto } from './file';

export interface FsDto {
  directories: DirectoryDto[];
  files: FileDto[];
}
