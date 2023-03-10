import { ShopLayout } from '@/components/layouts';
import { jwt } from '@/utils';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const AddressPage = () => {
  return (
    <ShopLayout
      title="Clouty | Address for Buy destiny"
      pageDescription="Confirm address for destiny"
    >
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Surname" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="ZIP Code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Brazil</MenuItem>
              <MenuItem value={3}>Uruguay</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          View Order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies;
  let isValidToken = false;
  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }
  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?page=/checkout/address',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AddressPage;
