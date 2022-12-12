import * as bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import userService from '../../../db/user';
import bodyMiddleware from '../../../middlewares/bodyMiddleware';
import methodMiddleware from '../../../middlewares/methodMiddleware';

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     description:
 *       Used to register new session
 *     consumes:
 *       - application/json
 *     parameters:
 *         - in: body
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
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
 *                   example: 638e5a15c07f4b7561149b0a
 *                 login:
 *                   type: string
 *                   example: login
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGU1YTE1YzA3ZjRiNzU2MTE0OWIwYSIsImxvZ2luIjoibG9naW4iLCJpYXQiOjE2NzA4NTc3MzAsImV4cCI6MTY3MTQ2MjUzMH0.IQA8IhnOW_LJP9Nl0ntyh4q3uWImPR7yCUpVRGUHRsI
 *       400:
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
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (
    !methodMiddleware(req, res, ['POST']) ||
    !bodyMiddleware(req, res, {
      login: 'string',
      password: 'string',
    })
  ) {
    return;
  }

  const { login, password } = req.body;

  const userFromDb = await userService.findByLogin(login);
  if (!userFromDb) {
    res.status(400).json({
      message: 'User not found',
    });
    return;
  }

  if (!(await bcrypt.compare(password, userFromDb.password))) {
    res.status(400).json({
      message: 'Invalid user or password',
    });
    return;
  }

  const tokenPayload = {
    id: userFromDb.id,
    login: userFromDb.login,
  };
  const token = await userService.generateToken(tokenPayload);
  await userService.updateToken({ userId: userFromDb.id, token });
  res.status(200).json({
    login: userFromDb.login,
    id: userFromDb.id,
    token: token,
  });
}
