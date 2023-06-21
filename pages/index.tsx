import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Container,
  Box,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Stack
} from '@mui/material';
import { film } from '@prisma/client';
import { getFilms } from 'services/local';

const IndexPage: NextPage<{}> = () => {
  const [isLoadingFilms, setIsLoadingFilms] = React.useState<boolean>(false);
  const [films, setFilms] = React.useState<film[]>([]);
  const [timing, setTiming] = React.useState<number>(0);
  const [filmsX5, setFilmsX5] = React.useState<film[][]>([]);
  const [timingX5, setTimingX5] = React.useState<number[]>([]);

  const resetAll = () => {
    setFilms([]);
    setTiming(0);
    setFilmsX5([]);
  };

  const handleFetchFilms: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    resetAll();
    setIsLoadingFilms(true);
    e.preventDefault();
    const { data: films, timing } = await getFilms();
    setFilms(films);
    setTiming(timing);
    setIsLoadingFilms(false);
  };

  const handleFetchFilmsX5: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    resetAll();
    setIsLoadingFilms(true);
    e.preventDefault();
    const { data: films1, timing: timing1 } = await getFilms();
    const { data: films2, timing: timing2 } = await getFilms();
    const { data: films3, timing: timing3 } = await getFilms();
    const { data: films4, timing: timing4 } = await getFilms();
    const { data: films5, timing: timing5 } = await getFilms();
    setFilmsX5([films1, films2, films3, films4, films5]);
    setTimingX5([timing1, timing2, timing3, timing4, timing5]);
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
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={handleFetchFilms}
                disabled={isLoadingFilms}
              >
                Fetch once
              </Button>
              <Button
                variant="contained"
                onClick={handleFetchFilmsX5}
                disabled={isLoadingFilms}
              >
                Fetch 5 times
              </Button>
            </Stack>
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
            {filmsX5.length > 0 && (
              <p>
                Fetched <b>{filmsX5[0].length}</b> films {filmsX5.length} times
                in{' '}
                {timingX5.map((ms, i) => (
                  <b key={i}>{`${Math.round(ms)}ms `}</b>
                ))}
                , for a mean of{' '}
                <b>
                  {Math.round(
                    timingX5.reduce((a, b) => a + b, 0) / timingX5.length
                  )}
                  ms
                </b>
              </p>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndexPage;
