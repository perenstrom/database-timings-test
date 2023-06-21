import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Box, Paper, Button } from '@mui/material';
import { film } from '@prisma/client';
import { getFilms } from 'services/local';

const IndexPage: NextPage<{}> = () => {
  const [films, setFilms] = React.useState<film[]>([]);
  const [timing, setTiming] = React.useState<number>(0);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const { data: films, timing } = await getFilms();
    setFilms(films);
    setTiming(timing);
  };

  return (
    <Container maxWidth="md">
      <Head>
        <title>NextJS Typescript Starter</title>
      </Head>
      <Box mt={6}>
        <Paper>
          <Box p={2}>
            <Button variant="contained" onClick={handleOnClick}>
              Click Me
            </Button>
            {films.length > 0 && (
              <p>
                Fetched {films.length} films in {timing}ms
              </p>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndexPage;
