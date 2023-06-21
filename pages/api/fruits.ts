import { NextApiRequest, NextApiResponse } from 'next';
import { prismaContext } from 'lib/prisma';
import { getFruits } from 'services/prisma';

const fruits = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return new Promise((resolve) => {
      getFruits(prismaContext)
        .then((fruits) => {
          res.status(200).json(fruits);
          resolve('');
        })
        .catch((error) => {
          console.log(error);
          res.status(500).end('Unexpected internal server error');
          resolve('');
        });
    });
  } else {
    res.status(404).end();
  }
};

export default fruits;
