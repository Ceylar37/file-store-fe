import authMiddleware from '@middlewares/authMiddleware'
import bodyMiddleware from '@middlewares/bodyMiddleware'
import methodMiddleware from '@middlewares/methodMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import dbConnect from 'src/db/dbConnect'
import fsService from '../../../db/fs'

/**
 * @swagger
 * /files/createDirectory:
 *   post:
 *     description:
 *       Used to create new directory
 *     consumes:
 *       - application/json
 *     parameters:
 *         - in: body
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - directoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: dir1
 *               directoryId:
 *                 type: string
 *                 example: 6371140a0b2bd25336e7a4cd
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 63711449a7073582fe8a4ca9
 *                 name:
 *                   type: string
 *                   example: dir2
 *                 directoryId:
 *                   type: string
 *                   example: 6371140a0b2bd25336e7a4cd
 *       401:
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

  if (
    !methodMiddleware(req, res, ['POST']) ||
    !bodyMiddleware(req, res, {
      name: 'string',
    })
  ) {
    return;
  }

  const user = await authMiddleware(req, res);
  if (!user) {
    return;
  }

  const { name, directoryId } = req.body;

  try {
    const createdDirectoryInfo = await fsService.createDirectory({
      directoryId,
      name,
      userId: user.id,
    });

    res.status(200).json(createdDirectoryInfo);
    return;
  } catch (e) {
    if (e && typeof e === 'object' && 'message' in e) {
      res.status(400).json({
        message: e.message,
      });
    } else {
      res.status(500).json(e);
    }
    return;
  }
}
