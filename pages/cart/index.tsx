import React, { useContext, useEffect } from 'react';
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
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const CartPage = () => {
  const { numberOfItems, isLoaded } = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded || numberOfItems === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title={`Cart - ${numberOfItems}`}
      pageDescription={'Shopping Cart of Store'}
    >
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/*  CardList */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
