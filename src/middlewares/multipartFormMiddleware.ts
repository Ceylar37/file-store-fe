import methodMiddleware from '@middlewares/methodMiddleware';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import NextCors from 'nextjs-cors';

const form = formidable({ multiples: false });

export const parseMultipartForm = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const contentType = req.headers['content-type'];
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields;
        req.body.files = files;
      }
      next();
    });
  } else {
    next();
  }
};

const multipartFormMiddleware = nextConnect();

multipartFormMiddleware.use(parseMultipartForm);

export default multipartFormMiddleware;
