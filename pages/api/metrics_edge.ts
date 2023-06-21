import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
  regions: ['fra1']
};

const metrics = async () => {
  return NextResponse.json({ data: 'Hello world' });
};

export default metrics;
