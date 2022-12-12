import authMiddleware from '@middlewares/authMiddleware';
import methodMiddleware from '@middlewares/methodMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import fsService from '../../../../db/fs';

/**
 * @swagger
 * /files/directoryContent/{id}:
 *   get:
 *     description:
 *       Used to get directory content
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: id of directory
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
 *                         type: string
 *                         example: 63711449a7073582fe8a4ca9
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
 *                         type: string
 *                         example: 63711449a7073582fe8a4ca9
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

  const { id } = req.query;

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

  const directoryContent = await fsService.getDirectoryContent({
    userId: user.id,
    directoryId: id,
  });
  res.status(200).json(directoryContent);
}
