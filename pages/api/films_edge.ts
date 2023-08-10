import { prismaContext } from 'lib/prisma_edge';
import { getFilms } from 'services/prisma';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
  regions: ['fra1']
};

const films = async () => {
  getFilms(prismaContext).then((films) => {
    NextResponse.json(films);
  });
};

export default films;
