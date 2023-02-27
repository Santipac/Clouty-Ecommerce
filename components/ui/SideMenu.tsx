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
import { UiContext } from '@/context';
import { useRouter } from 'next/router';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
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

          <ListItem>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'My Orders'} />
          </ListItem>

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
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

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
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

          <ListItem sx={{ display: { xs: '', sm: 'none' } }}>
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

          <ListItem>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Sign in'} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Sign out'} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Products'} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Orders'} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
