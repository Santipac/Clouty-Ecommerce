import { UiContext } from '@/context';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

export const Navbar = () => {
  const router = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.length === 0) return;
    router.push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Box
            className="fadeIn"
            sx={{
              display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
            }}
          >
            <NextLink href="/category/men" passHref legacyBehavior>
              <Link>
                <Button
                  color={
                    router.pathname === '/category/men' ? 'primary' : 'info'
                  }
                >
                  Men
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/women" passHref legacyBehavior>
              <Link>
                <Button
                  color={
                    router.pathname === '/category/women' ? 'primary' : 'info'
                  }
                >
                  Women
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/kids" passHref legacyBehavior>
              <Link>
                <Button
                  color={
                    router.pathname === '/category/kids' ? 'primary' : 'info'
                  }
                >
                  Kids
                </Button>
              </Link>
            </NextLink>
          </Box>
          <NextLink href="/" passHref legacyBehavior>
            <Link display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="bold">
                P.Clothes&#174;
              </Typography>
            </Link>
          </NextLink>

          <Box display="flex" alignItems="center">
            {isSearchVisible ? (
              <Input
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                }}
                className="fadeIn"
                autoFocus
                type="text"
                value={searchTerm}
                onKeyUp={e => (e.key === 'Enter' ? onSearchTerm() : null)}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIsSearchVisible(false);
                      }}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                }}
                className="fadeIn"
              >
                <SearchOutlined />
              </IconButton>
            )}

            <IconButton
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              onClick={toggleSideMenu}
            >
              <SearchOutlined />
            </IconButton>
            <NextLink href="/cart" passHref legacyBehavior>
              <Link>
                <IconButton>
                  <Badge badgeContent={2} color="secondary">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
              </Link>
            </NextLink>
            <Button onClick={toggleSideMenu}>Menu</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
