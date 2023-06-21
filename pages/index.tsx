import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@mui/material';
import { Films } from 'components/Films';
import { HelloWorld } from 'components/HelloWorld';
import { HelloWorldEdge } from 'components/HelloWorldEdge';

const IndexPage: NextPage<{}> = () => {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Database Speed Test</title>
      </Head>
      <Films />
      <HelloWorld />
      <HelloWorldEdge />
    </Container>
  );
};

export default IndexPage;
