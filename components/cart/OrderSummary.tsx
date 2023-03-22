import { CartContext } from '@/context';
import { IOrder } from '@/interfaces';
import { currency } from '@/utils';
import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';

interface Props {
  order: IOrder;
}

export const OrderSummary: React.FC<Props> = ({ order }) => {
  const cart = useContext(CartContext);

  const infoToShow = order ? order : cart;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{infoToShow.numberOfItems} item(s)</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(infoToShow.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(infoToShow.taxes)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(infoToShow.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
