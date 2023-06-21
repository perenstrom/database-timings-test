import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'edge'
};

const metrics = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return new Promise((resolve) => {
      res.status(200).json({ data: 'Hello world' });
      resolve('');
    });
  } else {
    res.status(404).end();
  }
};

export default metrics;
