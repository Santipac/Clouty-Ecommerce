import { CardList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

const OrderPage = () => {
  return (
    <ShopLayout
      title="Order Summary 123B43"
      pageDescription={'Summary of the order'}
    >
      <Typography variant="h1" component="h1">
        Order: 123B43
      </Typography>
      {/* <Chip
        sx={{ my: 2 }}
        label="Pay Pending"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label="Completed"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/*  CardList */}
          <CardList editable />
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
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always" color="secondary">
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Completed"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
