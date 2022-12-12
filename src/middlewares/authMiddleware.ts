import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import userService from '../db/user';
import { UserDto } from '../db/user/dto/users';

if (!process.env.SECRET) {
  throw new Error('Define the SECRET environment variable');
}

const SECRET = process.env.SECRET;

const bodyMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<UserDto | null> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        message: 'Authorization header is required',
      });
      return null;
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      res.status(401).json({
        message: 'User not authorized',
      });
      return null;
    }
    const tokenData = jwt.verify(token, SECRET) as {
      id: string;
      login: string;
      exp: number;
    };
    const user = await userService.findOne(tokenData.id);
    if (user?.token !== token) {
      res.status(401).json({
        message: 'User not authorized',
      });
      return null;
    }

    if (Date.now() / 1000 > +tokenData.exp) {
      res.status(401).json({
        message: 'User not authorized',
      });
      return null;
    }

    return user;
  } catch (e) {
    res.status(401).json({
      message: 'User not authorized',
    });
    return null;
  }
};

export default bodyMiddleware;
