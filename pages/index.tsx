import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Box, Paper, Button } from '@mui/material';
import { Fruit } from '@prisma/client';
import { getFruits } from 'services/local';

const IndexPage: NextPage<{}> = () => {
  const [fruits, setFruits] = React.useState<Fruit[]>([]);
  const [timing, setTiming] = React.useState<number>(0);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const { data: fruits, timing } = await getFruits();
    setFruits(fruits);
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
            <p>
              This is my preferred starter template for building NextJS apps in
              Typescript. This version also includes{' '}
              <a href="https://mui.com/">MUI</a> (formerly known as Material UI)
              for quicker prototyping.
            </p>
            <pre>{JSON.stringify(fruits, null, 2)}</pre>
            <pre>{JSON.stringify(timing, null, 2)}</pre>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndexPage;
