import { Context } from 'lib/prisma';

export const getFilmsEdge = async (ctx: Context) => {
  const startTime = (new Date()).valueOf();
  const result = await ctx.prisma.film.findMany({});
  const timing = (new Date()).valueOf() - startTime;

  return { data: result, timing };
};
