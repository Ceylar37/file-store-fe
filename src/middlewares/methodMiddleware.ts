import { NextApiRequest, NextApiResponse } from 'next';

const methodMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[]
) => {
  if (!req.method) {
    res.status(404).json({
      message: 'Not Found',
    });
    return false;
  }

  if (!allowedMethods.includes(req.method)) {
    res.status(404).json({
      message: `Cannot ${req.method}`,
    });
    return false;
  }

  return true;
};

export default methodMiddleware;
