import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { CartContext } from '@/context';
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
import React, { useContext, useEffect, useState } from 'react';

const SummaryPage = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { shippingAddress, createOrder } = useContext(CartContext);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`);
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
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sm={7}>
          {/*  CardList */}
          <CartList editable />
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
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>
                <Box
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                  width="100%"
                  justifyContent="center"
                  p=".2rem"
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="red"
                >
                  <Typography color="error">{errorMessage}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
