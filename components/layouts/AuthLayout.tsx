import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import bgImage from '@/assets/backgroundimg.jpg';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="#e5e5f7"
          sx={{
            backgroundImage:
              'radial-gradient(#1d1d1b 2px, transparent 2px), radial-gradient(#1d1d1b 2px, #ececec 2px)',
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0,40px 40px',
          }}
          px={2}
        >
          {children}
        </Box>
      </main>
    </>
  );
};

export default AuthLayout;
