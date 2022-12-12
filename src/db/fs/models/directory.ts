import { Schema, model, models } from 'mongoose';

export interface Directory {
  name: string;
  userId: string;
  directoryId: string | null;
}

const DirectorySchema = new Schema<Directory>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  directoryId: { type: String },
});

const directoryModel = models.Directory || model('Directory', DirectorySchema);

export default directoryModel;
