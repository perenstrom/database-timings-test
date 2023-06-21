import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Container,
  Box,
  Paper,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { film } from '@prisma/client';
import { getFilms } from 'services/local';

const IndexPage: NextPage<{}> = () => {
  const [isLoadingFilms, setIsLoadingFilms] = React.useState<boolean>(false);
  const [films, setFilms] = React.useState<film[]>([]);
  const [timing, setTiming] = React.useState<number>(0);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    setIsLoadingFilms(true);
    e.preventDefault();
    const { data: films, timing } = await getFilms();
    setFilms(films);
    setTiming(timing);
    setIsLoadingFilms(false);
  };

  return (
    <Container maxWidth="md">
      <Head>
        <title>Database Speed Test</title>
      </Head>
      <Box mt={6}>
        <Paper>
          <Box p={2}>
            <Typography variant={'h1'} pb={2}>
              Fetch all films from the database
            </Typography>
            <Button
              variant="contained"
              onClick={handleOnClick}
              disabled={isLoadingFilms}
            >
              Fetch once
            </Button>
            {isLoadingFilms && (
              <Box>
                <CircularProgress />
              </Box>
            )}
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
