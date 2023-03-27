import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminNavbar } from '../admin';
import { SideMenu } from '../ui';

interface Props {
  title: string;
  subTitle: string;
  pageDescription: string;
  icon?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const AdminLayout: React.FC<Props> = ({
  children,
  title,
  subTitle,
  icon,
  pageDescription,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
