import { NextApiRequest, NextApiResponse } from 'next';

const bodyMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  requiredBodyFields: Record<string, string | string[]>
) => {
  for (const requiredBodyField in requiredBodyFields) {
    if (!req.body[requiredBodyField]) {
      res.status(400).json({
        message: `${requiredBodyField} field is required`,
      });
      return false;
    }

    if (Array.isArray(requiredBodyField)) {
      if (
        requiredBodyField.every(
          type => type !== typeof req.body[requiredBodyField]
        )
      ) {
        res.status(400).json({
          message: `Incorrect type of ${requiredBodyField} field`,
        });
        return false;
      }
    } else {
      if (
        typeof req.body[requiredBodyField] !==
        requiredBodyFields[requiredBodyField]
      ) {
        res.status(400).json({
          message: `Incorrect type of ${requiredBodyField} field`,
        });
        return false;
      }
    }
  }

  return true;
};

export default bodyMiddleware;
