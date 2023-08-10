import { PrismaClient } from '@prisma/client/edge';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prismaEdge: PrismaClient | undefined;
}

export const prismaEdge =
  global.prismaEdge ||
  new PrismaClient({
    log: []
  });

export const prismaContext = { prisma: prismaEdge };

if (process.env.NODE_ENV !== 'production') global.prismaEdge = prismaEdge;

export type Context = {
  prisma: PrismaClient;
};
