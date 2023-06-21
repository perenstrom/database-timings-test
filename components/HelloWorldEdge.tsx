import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import React from 'react';
import { getHelloWorldEdge } from 'services/local';

export const HelloWorldEdge: React.FC<{}> = () => {
  const [isLoadingHelloWorld, setIsLoadingHelloWorld] =
    React.useState<boolean>(false);
  const [timingHelloWorldFEX5, setTimingHelloWorldFEX5] = React.useState<
    number[]
  >([]);

  const resetAll = () => {
    setTimingHelloWorldFEX5([]);
  };

  const handleFetchHelloWorldX5: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    resetAll();
    setIsLoadingHelloWorld(true);
    e.preventDefault();

    let now = performance.now();
    await getHelloWorldEdge();
    const timingFE1 = performance.now() - now;

    now = performance.now();
    await getHelloWorldEdge();
    const timingFE2 = performance.now() - now;

    now = performance.now();
    await getHelloWorldEdge();
    const timingFE3 = performance.now() - now;

    now = performance.now();
    await getHelloWorldEdge();
    const timingFE4 = performance.now() - now;

    now = performance.now();
    await getHelloWorldEdge();
    const timingFE5 = performance.now() - now;

    setTimingHelloWorldFEX5([
      timingFE1,
      timingFE2,
      timingFE3,
      timingFE4,
      timingFE5
    ]);
    setIsLoadingHelloWorld(false);
  };
  return (
    <Box mt={6}>
      <Paper>
        <Box p={2}>
          <Typography variant={'h1'} pb={2}>
            Fetch hello world from edge api function
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={handleFetchHelloWorldX5}
              disabled={isLoadingHelloWorld}
            >
              Fetch 5 times
            </Button>
          </Stack>
          {isLoadingHelloWorld && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {timingHelloWorldFEX5.length > 0 && (
            <p>
              Fetched &quot;hello world&quot; {timingHelloWorldFEX5.length}{' '}
              times in a mean time of{' '}
              <b>
                {Math.round(
                  timingHelloWorldFEX5.reduce((a, b) => a + b, 0) /
                    timingHelloWorldFEX5.length
                )}
                ms
              </b>
            </p>
          )}

          {timingHelloWorldFEX5.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {timingHelloWorldFEX5.map((ms, i) => (
                    <TableCell key={i}>Fetch {i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Time</TableCell>
                  {timingHelloWorldFEX5.map((ms, i) => (
                    <TableCell key={i}>{`${Math.round(ms)}ms`}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
