import React, { useState } from 'react';
import { CartList, OrderSummary } from '@/components/cart';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ShopLayout } from '@/components/layouts';
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
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { OrderResponseBody } from '@paypal/paypal-js';
import { CloutyApi } from '@/api';
import { useRouter } from 'next/router';

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const { shippingAddress } = order;
  const [isPaying, setisPaying] = useState(false);
  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No Paypal payment');
    }
    setisPaying(true);
    try {
      await CloutyApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setisPaying(false);
      console.log(error);
    }
  };

  return (
    <ShopLayout
      title="Order Summary 123B43"
      pageDescription={'Summary of the order'}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h1" component="h1">
          Order:
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mt: 1 }}>
          {order._id}
        </Typography>
      </Box>

      {order.isPaid ? (
        <Box
          my={2}
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
          my={2}
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

      <Grid container className="fadeIn" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card
            className="summary-card"
            sx={{
              borderRadius: '2px',
              boxShadow: 'none',
            }}
          >
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
                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>
                <Box
                  sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
                  flexDirection="column"
                >
                  {order.isPaid ? (
                    <Box
                      my={2}
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      p=".2rem"
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
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        return actions.order!.capture().then(details => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?page=/orders/${id}`,
        permanent: false,
      },
    };
  }
  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};
export default OrderPage;
