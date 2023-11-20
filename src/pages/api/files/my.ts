import authMiddleware from '@middlewares/authMiddleware'
import methodMiddleware from '@middlewares/methodMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import dbConnect from 'src/db/dbConnect'
import fsService from '../../../db/fs'

/**
 * @swagger
 * /files/my:
 *   get:
 *     description:
 *       Used to get user file system
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 directories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 6374b258f1eb3892023e3bd7
 *                       directoryId:
 *                         type: null
 *                         example: null
 *                       name:
 *                         type: string
 *                         example: dir1
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 6374b264f1eb3892023e3bdb
 *                       directoryId:
 *                         type: null
 *                         example: null
 *                       name:
 *                         type: string
 *                         example: file1.docx
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: string
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

  const user = await authMiddleware(req, res);
  if (!user) {
    return;
  }

  const userFS = await fsService.getUserFiles(user.id);
  res.status(200).json(userFS);
}
