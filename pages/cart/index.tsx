import { CardList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

const CartPage = () => {
  return (
    <ShopLayout title={'Cart - 3'} pageDescription={'Shopping Cart of Store'}>
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/*  CardList */}
          <CardList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
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
