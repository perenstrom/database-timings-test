import { prismaContext } from 'lib/prisma_edge';
import { getFilmsEdge } from 'services/prismaEdge';
 
export const config = {
  runtime: 'edge',
  regions: ['fra1']
}
 
export default async function handler() {
  const result = await getFilmsEdge(prismaContext);

  return new Response(
    JSON.stringify(result),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
