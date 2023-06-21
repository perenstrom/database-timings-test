import { Context } from 'lib/prisma';
import { performance } from 'perf_hooks';

export const getFilms = async (ctx: Context) => {
  const startTime = performance.now();
  const result = await ctx.prisma.film.findMany({});
  const timing = performance.now() - startTime;

  return { data: result, timing };
};
