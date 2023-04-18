import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout, ShopLayout } from '@/components/layouts';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout
      title="Order Summary"
      subTitle={`Summary for Order: ${order._id}`}
      pageDescription={'Summary of the order'}
    >
      {order.isPaid ? (
        <>
          <Box
            width="fit-content"
            display="flex"
            p=".5rem"
            borderRadius="10px"
            border="1px solid"
            borderColor="#357a38"
          >
            <CreditScoreOutlined color="success" />
            <Typography color="#357a38" ml={2}>
              Completed
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          width="fit-content"
          display="flex"
          p=".5rem"
          borderRadius="10px"
          border="1px solid"
          borderColor="red"
        >
          <CreditCardOffOutlined color="error" />
          <Typography color="error" ml={2}>
            Pay Pending
          </Typography>
        </Box>
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex">
                <Typography variant="subtitle1">Delivery Address</Typography>
              </Box>
              <Typography>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Typography>
              <Typography>{`${shippingAddress.address}${
                shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''
              }`}</Typography>
              <Typography>{`${shippingAddress.city} ${shippingAddress.zip}`}</Typography>
              <Typography>{`${shippingAddress.country}`}</Typography>
              <Typography>{`${shippingAddress.phone}`}</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary order={order} />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column">
                  {order.isPaid ? (
                    <Box
                      display="flex"
                      width="fit-content"
                      p=".5rem"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor="#357a38"
                    >
                      <CreditScoreOutlined color="success" />
                      <Typography color="#357a38" ml={2}>
                        Completed
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      width="fit-content"
                      p=".5rem"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor="red"
                    >
                      <CreditCardOffOutlined color="error" />
                      <Typography color="error" ml={2}>
                        Pay Pending
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};
export default OrderPage;
