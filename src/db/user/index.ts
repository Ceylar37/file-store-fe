import jwt from 'jsonwebtoken';

import dbConnect from '../dbConnect';
import { ChangeTokenDto } from './dto/changeToken';
import { UserCredsDto } from './dto/userCreds';
import { UserDto } from './dto/users';
import userModel from './models/user';

if (!process.env.SECRET) {
  throw new Error('Define the SECRET environment variable');
}

const SECRET = process.env.SECRET;

const findByLogin = async (login: string): Promise<UserDto | undefined> => {
  await dbConnect();
  const userFormDB = await userModel.findOne({ login }).exec();
  if (!userFormDB) return undefined;
  return {
    id: userFormDB.id,
    login: userFormDB.login,
    password: userFormDB.password,
    token: userFormDB.token,
  };
};

const create = async (dto: UserCredsDto): Promise<UserDto> => {
  const newUser = new userModel(dto);
  const createdUser = await newUser.save();
  return {
    id: createdUser.id,
    login: createdUser.login,
    password: createdUser.password,
    token: createdUser.token,
  };
};

const updateToken = async ({ token, userId }: ChangeTokenDto) => {
  return userModel.findByIdAndUpdate(userId, { token });
};

const findOne = async (id: string): Promise<UserDto | undefined> => {
  const userFormDB = await userModel.findById(id);
  if (!userFormDB) return undefined;
  return {
    id: userFormDB.id,
    login: userFormDB.login,
    password: userFormDB.password,
    token: userFormDB.token,
  };
};

const generateToken = async (data: any) => {
  return jwt.sign(data, SECRET, { expiresIn: '1w' });
};

const userService = {
  findByLogin,
  create,
  updateToken,
  generateToken,
  findOne,
};

export default userService;
