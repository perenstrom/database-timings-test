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
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { film } from '@prisma/client';
import { getFilms } from 'services/local';

const IndexPage: NextPage<{}> = () => {
  const [isLoadingFilms, setIsLoadingFilms] = React.useState<boolean>(false);
  const [films, setFilms] = React.useState<film[]>([]);
  const [timing, setTiming] = React.useState<number>(0);
  const [timingFE, setTimingFE] = React.useState<number>(0);
  const [filmsX5, setFilmsX5] = React.useState<film[][]>([]);
  const [timingX5, setTimingX5] = React.useState<number[]>([]);
  const [timingFEX5, setTimingFEX5] = React.useState<number[]>([]);

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
    const now = performance.now();
    const { data: films, timing } = await getFilms();
    const time = performance.now() - now;
    setFilms(films);
    setTiming(timing);
    setTimingFE(time);
    setIsLoadingFilms(false);
  };

  const handleFetchFilmsX5: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    resetAll();
    setIsLoadingFilms(true);
    e.preventDefault();

    let now = performance.now();
    const { data: films1, timing: timing1 } = await getFilms();
    const timingFE1 = performance.now() - now;

    now = performance.now();
    const { data: films2, timing: timing2 } = await getFilms();
    const timingFE2 = performance.now() - now;

    now = performance.now();
    const { data: films3, timing: timing3 } = await getFilms();
    const timingFE3 = performance.now() - now;

    now = performance.now();
    const { data: films4, timing: timing4 } = await getFilms();
    const timingFE4 = performance.now() - now;

    now = performance.now();
    const { data: films5, timing: timing5 } = await getFilms();
    const timingFE5 = performance.now() - now;

    setFilmsX5([films1, films2, films3, films4, films5]);
    setTimingX5([timing1, timing2, timing3, timing4, timing5]);
    setTimingFEX5([timingFE1, timingFE2, timingFE3, timingFE4, timingFE5]);
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
                Fetched {films.length} films in {Math.round(timingFE)}ms (where{' '}
                {Math.round(timing)}ms is spent in the database)
              </p>
            )}
            {filmsX5.length > 0 && (
              <p>
                Fetched <b>{filmsX5[0].length}</b> films {filmsX5.length} times
                in a mean time of{' '}
                <b>
                  {Math.round(
                    timingFEX5.reduce((a, b) => a + b, 0) / timingFEX5.length
                  )}
                  ms
                </b>
                , where the database took a mean time of{' '}
                <b>
                  {Math.round(
                    timingX5.reduce((a, b) => a + b, 0) / timingX5.length
                  )}
                  ms
                </b>
              </p>
            )}

            {filmsX5.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {timingFEX5.map((ms, i) => (
                      <TableCell key={i}>Fetch {i + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    {timingFEX5.map((ms, i) => (
                      <TableCell key={i}>{`${Math.round(ms)}ms`}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Database</TableCell>
                    {timingX5.map((ms, i) => (
                      <TableCell key={i}>{`${Math.round(ms)}ms`}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndexPage;
