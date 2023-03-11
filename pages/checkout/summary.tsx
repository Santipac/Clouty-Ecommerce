import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
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
import NextLink from 'next/link';
import React from 'react';

const SummaryPage = () => {
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
              <Typography>Santiago Pacini</Typography>
              <Typography>Bulnes 9239</Typography>
              <Typography>Palermo, Capital Federal</Typography>
              <Typography>Argentina</Typography>
              <Typography>+11 8745 5684 6456</Typography>
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
                <Button color="secondary" className="circular-btn" fullWidth>
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
