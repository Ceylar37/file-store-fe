export interface CreateFileDto {
  userId: string;
  name: string;
  file: any;
  directoryId?: string;
}
