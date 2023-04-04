import { UiContext } from '@/context';
import {
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
  DashboardOutlined,
} from '@mui/icons-material';
import {
  Divider,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export const AdminActionsOnSideBar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  const router = useRouter();
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <Button onClick={() => navigateTo('/admin')} sx={{ padding: 0 }}>
          <ListItemText primary={'Dashboard'} sx={{ textAlign: 'left' }} />
        </Button>
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <Button onClick={() => navigateTo('/products')} sx={{ padding: 0 }}>
          <ListItemText primary={'Products'} sx={{ textAlign: 'left' }} />
        </Button>
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <Button onClick={() => navigateTo('/admin/orders')} sx={{ padding: 0 }}>
          <ListItemText primary={'Orders'} sx={{ textAlign: 'left' }} />
        </Button>
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <Button onClick={() => navigateTo('/admin/users')} sx={{ padding: 0 }}>
          <ListItemText primary={'Users'} sx={{ textAlign: 'left' }} />
        </Button>
      </ListItem>
    </>
  );
};
