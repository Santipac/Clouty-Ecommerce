import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import { AdminLayout } from '@/components/layouts';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IUser } from '@/interfaces';
import { CloutyApi } from '@/api';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return toast.loading('Loading Data');
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map(user => ({ ...user }));

    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));
    setUsers(updatedUsers);

    try {
      await CloutyApi.put('/admin/users', { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      toast.error('User could not update');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Full Name', width: 300 },
    {
      field: 'role',
      headerName: 'Role',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            sx={{ width: '300px' }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];
  const rows = users.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Users"
      subTitle="Users maintenance"
      pageDescription="View for user control and maintenance "
      icon={<PeopleOutline />}
    >
      <Toaster />
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
