import methodMiddleware from '@middlewares/methodMiddleware'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import dbConnect from 'src/db/dbConnect'
import fsService from '../../../../../../db/fs'
import userService from '../../../../../../db/user'

if (!process.env.SECRET) {
  throw new Error('Define the SECRET environment variable');
}

const SECRET = process.env.SECRET;

/**
 * @swagger
 * /files/read/{token}/{id}/{name}:
 *   get:
 *     description:
 *       Used to get file
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: id of directory
 *       - in: path
 *         name: token
 *         type: string
 *         required: true
 *         description: user authorization token
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *         description: filename
 *     produces:
 *       - application/octet-stream
 *       - application/json
 *     responses:
 *       200:
 *         description: filestream
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: string
 *       403:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (!methodMiddleware(req, res, ['GET'])) {
    return;
  }

  const { id, token } = req.query;

  if (!id) {
    res.status(400).json({
      message: 'Id param required',
    });
    return;
  }

  if (Array.isArray(id)) {
    res.status(400).json({
      message: 'Invalid id param',
    });
    return;
  }

  if (!token) {
    res.status(400).json({
      message: 'Token param required',
    });
    return;
  }

  if (Array.isArray(token)) {
    res.status(400).json({
      message: 'Invalid token param',
    });
    return;
  }

  try {
    if (!token) {
      res.status(403).json({
        message: 'Forbidden',
      });
      return null;
    }
    const tokenData = jwt.verify(token, SECRET) as {
      id: string;
      login: string;
      exp: number;
    };
    console.log(tokenData);
    const user = await userService.findOne(tokenData.id);
    if (user?.token !== token) {
      res.status(403).json({
        message: 'Forbidden',
      });
      return null;
    }
    console.log(user);

    const file = await fsService.readFile({
      userId: user.id,
      id,
    });
    console.log(file);
    res.status(200).send(file);
  } catch (e) {
    if (
      e &&
      typeof e === 'object' &&
      'message' in e &&
      e.message === 'Forbidden'
    ) {
      res.status(403).json({
        message: 'Forbidden',
      });
      return;
    }
    res.status(500).json(e);
    return;
  }
}
