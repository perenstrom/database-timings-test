import { NextApiRequest, NextApiResponse } from 'next';
import { prismaContext } from 'lib/prisma';

const films = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const startTime = performance.now();
    const result = await prismaContext.prisma.film.findMany({});
    const timing = performance.now() - startTime;

    return res.json({ data: result, timing });
  } else {
    res.status(404).end();
  }
};

export default films;
