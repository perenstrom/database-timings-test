import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

const metrics = async () => {
  return NextResponse.json({ data: 'Hello world' });
};

export default metrics;
