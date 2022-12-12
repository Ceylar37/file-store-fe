import { Schema, model, models } from 'mongoose';

export interface User {
  login: string;
  password: string;
  token: string;
}

const userSchema = new Schema<User>({
  login: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: '' },
});

const userModel = models.User || model('User', userSchema);

export default userModel;
