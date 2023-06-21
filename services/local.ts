import { Fruit } from '@prisma/client';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8'
};

export const getFruits = async () => {
  const url = `/api/fruits`;
  const options: RequestInit = {
    method: 'GET',
    headers: defaultHeaders
  };

  const result = await fetch(url, options).then((r) => r.json());

  return result as { data: Fruit[]; timing: number };
};
