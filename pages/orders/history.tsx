import { ShopLayout } from '@/components/layouts';
import NextLink from 'next/link';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid/models';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },

  {
    field: 'paid',
    headerName: 'Paid',
    width: 200,
    renderCell: params => {
      return params.row.paid ? (
        <Chip color="success" label="Payed" variant="outlined" />
      ) : (
        <Chip color="error" label="Not payed" variant="outlined" />
      );
    },
  },
  {
    field: 'orders',
    headerName: 'View Order',
    width: 200,
    sortable: false,
    renderCell: params => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always" color="secondary">
            View Order
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, fullName: 'Santiago Pacini', paid: true },
  { id: 2, fullName: 'Carina Pacini', paid: false },
  { id: 3, fullName: 'Pablo Pacini', paid: false },
  { id: 4, fullName: 'Alberto Pacini', paid: false },
  { id: 5, fullName: 'Sandra Pacini', paid: true },
];

const HistoryOrdersPage = () => {
  return (
    <ShopLayout title="Order History" pageDescription="Customer order history">
      <Typography variant="h1" component="h1">
        Order History
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryOrdersPage;
