import { ShopLayout } from '@/components/layouts';
import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorPage = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="Nothing to see here">
      <Box
        display="flex"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>Page not found</Typography>
      </Box>
    </ShopLayout>
  );
};

export default ErrorPage;
