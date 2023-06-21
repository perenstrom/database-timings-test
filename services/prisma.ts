import { Context } from 'lib/prisma';
import { performance } from 'perf_hooks';

export const getFruits = async (ctx: Context) => {
  const startTime = performance.now();
  const result = await ctx.prisma.fruit.findMany({});
  const timing = performance.now() - startTime;

  return { data: result, timing };
};
