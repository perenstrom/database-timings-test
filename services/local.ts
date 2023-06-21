import { film } from '@prisma/client';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8'
};

export const getFilms = async () => {
  const url = `/api/films`;
  const options: RequestInit = {
    method: 'GET',
    headers: defaultHeaders
  };

  const result = await fetch(url, options).then((r) => r.json());

  return result as { data: film[]; timing: number };
};

export const getFilmsEdge = async () => {
  const url = `/api/films_edge`;
  const options: RequestInit = {
    method: 'GET',
    headers: defaultHeaders
  };

  const result = await fetch(url, options).then((r) => r.json());

  return result as { data: film[]; timing: number };
};

export const getHelloWorld = async () => {
  const url = `/api/metrics`;
  const options: RequestInit = {
    method: 'GET',
    headers: defaultHeaders
  };

  const result = await fetch(url, options).then((r) => r.json());

  return result as { data: string };
};

export const getHelloWorldEdge = async () => {
  const url = `/api/metrics_edge`;
  const options: RequestInit = {
    method: 'GET',
    headers: defaultHeaders
  };

  const result = await fetch(url, options).then((r) => r.json());

  return result as { data: string };
};
