import { PrismaClient } from '@prisma/client/edge';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: []
  });

export const prismaContext = { prisma };

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export type Context = {
  prisma: PrismaClient;
};
