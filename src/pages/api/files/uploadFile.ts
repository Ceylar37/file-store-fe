import authMiddleware from '@middlewares/authMiddleware';
import multipartFormMiddleware from '@middlewares/multipartFormMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import NextCors from 'nextjs-cors';

import fsService from '../../../db/fs';

/**
 * @swagger
 * /files/uploadFile:
 *   post:
 *     description:
 *       Used to upload file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *         - in: body
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - directoryId
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *               directoryId:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
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
 *                   example: 6374b264f1eb3892023e3bdb
 *                 name:
 *                   type: string
 *                   example: file1.docx
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
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

handler.use(multipartFormMiddleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const contentType = req.headers['content-type'];
  if (!contentType || contentType.indexOf('multipart/form-data') === -1) {
    res.status(400).json({
      message: 'Invalid content type header',
    });
    return;
  }

  const user = await authMiddleware(req, res);
  if (!user) {
    return;
  }

  try {
    const body = req.body;
    if (!body.files.file) {
      res.status(400).json({ message: 'file is required' });
      return;
    }
    const createdFileInfo = await fsService.createFile({
      file: body.files.file,
      userId: user.id,
      directoryId: body.directoryId,
      name: body.name,
    });
    res.status(200).json(createdFileInfo);
  } catch (e) {
    if (e && typeof e === 'object' && 'message' in e) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(500).json(e);
    }
    return;
  }
});

export default handler;
