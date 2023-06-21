import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
// import { prismaContext } from 'lib/prisma';
import { getFilms } from 'services/prisma';

const films = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return new Promise((resolve) => {
      const prismaContext = new PrismaClient();
      getFilms({ prisma: prismaContext })
        .then((films) => {
          res.status(200).json(films);
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

export default films;
