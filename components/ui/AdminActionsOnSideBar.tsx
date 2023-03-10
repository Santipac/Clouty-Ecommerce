import {
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
} from '@mui/icons-material';
import {
  Divider,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

export const AdminActionsOnSideBar = () => {
  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={'Products'} />
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={'Orders'} />
      </ListItem>
      <ListItem sx={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={'Users'} />
      </ListItem>
    </>
  );
};
