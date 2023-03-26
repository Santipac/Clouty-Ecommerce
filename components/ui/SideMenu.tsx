import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext, UiContext } from '@/context';
import { useRouter } from 'next/router';
import { AdminActionsOnSideBar } from './AdminActionsOnSideBar';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user, isLoggedIn, logoutUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const onSearchTerm = () => {
    if (searchTerm.length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      onClose={toggleSideMenu}
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          {isLoggedIn ? (
            <>
              <ListItem sx={{ cursor: 'pointer' }}>
                <Input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onKeyUp={e => (e.key === 'Enter' ? onSearchTerm() : null)}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={onSearchTerm}>
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ListItem>

              <ListItem sx={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <Button
                  onClick={() => navigateTo('/orders/history')}
                  sx={{ padding: 0 }}
                >
                  <ListItemText
                    primary={'Profile'}
                    sx={{ textAlign: 'left' }}
                  />
                </Button>
              </ListItem>

              <ListItem sx={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <Button
                  onClick={() => navigateTo('/orders/history')}
                  sx={{ padding: 0 }}
                >
                  <ListItemText
                    primary={'My Orders'}
                    sx={{ textAlign: 'left' }}
                  />
                </Button>
                <ListItemText />
              </ListItem>

              <ListItem
                sx={{ display: { xs: '', sm: 'none' }, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <MaleOutlined />
                </ListItemIcon>
                <Button
                  onClick={() => navigateTo('/category/men')}
                  sx={{ padding: 0 }}
                >
                  <ListItemText primary={'Men'} sx={{ textAlign: 'left' }} />
                </Button>
              </ListItem>

              <ListItem
                sx={{ display: { xs: '', sm: 'none' }, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <FemaleOutlined />
                </ListItemIcon>
                <Button
                  onClick={() => navigateTo('/category/women')}
                  sx={{ padding: 0 }}
                >
                  <ListItemText primary={'Women'} sx={{ textAlign: 'left' }} />
                </Button>
              </ListItem>

              <ListItem
                sx={{ display: { xs: '', sm: 'none' }, cursor: 'pointer' }}
              >
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <Button
                  onClick={() => navigateTo('/category/kids')}
                  sx={{ padding: 0 }}
                >
                  <ListItemText primary={'Kids'} sx={{ textAlign: 'left' }} />
                </Button>
              </ListItem>

              <ListItem onClick={logoutUser} sx={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={'Sign out'} />
              </ListItem>

              {/* Admin */}
              {user?.role === 'admin' && <AdminActionsOnSideBar />}
            </>
          ) : (
            <>
              <ListItem>
                <Input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onKeyUp={e => (e.key === 'Enter' ? onSearchTerm() : null)}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={onSearchTerm}>
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ListItem>
              <ListItem
                sx={{ cursor: 'pointer' }}
                onClick={() => navigateTo(`/auth/login?page=${router.asPath}`)}
              >
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={'Sign in'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
