import { ShopLayout } from '@/components/layouts';
import NextLink from 'next/link';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid/models';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

function convertDateAndHour(date: string) {
  // Crea una nueva instancia de Date con la fecha y hora proporcionada
  const fecha = new Date(date);

  // Extrae los componentes de la fecha y hora
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const anio = fecha.getUTCFullYear();
  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();
  const segundos = fecha.getUTCSeconds();

  // Formatea la fecha y hora en el formato deseado
  const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes
    .toString()
    .padStart(2, '0')}/${anio.toString()} ${horas
    .toString()
    .padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos
    .toString()
    .padStart(2, '0')}`;

  // Retorna la fecha y hora formateada
  return fechaFormateada;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'products', headerName: 'Products', width: 150 },
  { field: 'total', headerName: 'Order Total', width: 150 },

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
  { field: 'createdAt', headerName: 'Order created at', width: 300 },
  {
    field: 'orders',
    headerName: 'View Order',
    width: 200,
    sortable: false,
    renderCell: params => {
      return (
        <NextLink
          href={`/orders/${params.row.orderId}`}
          passHref
          legacyBehavior
        >
          <Link underline="always" color="secondary">
            View Order
          </Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryOrdersPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => {
    return {
      id: index,
      products: order.numberOfItems,
      total: `$${order.total}`,
      paid: order.isPaid,
      orderId: order._id,
      createdAt: convertDateAndHour(order.createdAt!),
    };
  });
  return (
    <ShopLayout title="Order History" pageDescription="Customer order history">
      <Typography variant="h1" component="h1" sx={{ my: 2 }}>
        Order History
      </Typography>
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
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?page=/orders/history',
        permanent: false,
      },
    };
  }
  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryOrdersPage;
