import React from 'react';
import useSWR from 'swr';
import { AdminLayout } from '@/components/layouts';
import { IOrder, IUser } from '@/interfaces';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Full Name', width: 300 },
  { field: 'total', headerName: 'Total Amount', width: 300 },
  {
    field: 'isPaid',
    headerName: 'Paid',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paid" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
    width: 150,
  },
  {
    field: 'NumProducts',
    headerName: 'Nº Products',
    align: 'center',
    width: 150,
  },
  {
    field: 'check',
    headerName: 'View Order',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          View Order
        </a>
      );
    },
    width: 250,
  },
  { field: 'createdAt', headerName: 'Created at', width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error)
    return <Typography variant="subtitle1">Loading...</Typography>;

  if (!data)
    return (
      <AdminLayout
        title="Orders Admin"
        subTitle="Orders Administration"
        pageDescription="Orders administration for admins of Clouty Store"
        icon={<ConfirmationNumberOutlined />}
      >
        <Typography variant="subtitle1">Orders not found.</Typography>
      </AdminLayout>
    );

  const rows = data.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    NumProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Orders Admin"
      subTitle="Orders Administration"
      pageDescription="Orders administration for admins of Clouty Store"
      icon={<ConfirmationNumberOutlined />}
    >
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

export default OrdersPage;
