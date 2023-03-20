import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { CartContext } from '@/context';
import { countries } from '@/utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, createOrder } = useContext(CartContext);

  const onCreateOrder = () => {
    createOrder();
  };

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }
  const { firstName, lastName, country, phone, city, zip, address, address2 } =
    shippingAddress;

  return (
    <ShopLayout title="Order Summary" pageDescription={'Summary of the order'}>
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/*  CardList */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always" color="secondary">
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <Typography>{`${firstName} ${lastName}`}</Typography>
              <Typography>{`${address} - ${address2}`}</Typography>
              <Typography>{`${city}, ${country}`}</Typography>
              <Typography>{zip}</Typography>
              <Typography>{phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex">
                <Typography sx={{ flex: 1 }} variant="subtitle1">
                  Cart Summary
                </Typography>
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always" color="secondary">
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
