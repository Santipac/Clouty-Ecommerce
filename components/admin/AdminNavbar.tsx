import { CartContext, UiContext } from '@/context';

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Clouty Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
