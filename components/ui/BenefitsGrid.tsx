import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  LocalShippingOutlined,
  CreditScoreOutlined,
  CheckroomOutlined,
  SavingsOutlined,
} from '@mui/icons-material';
import { BenefitsItem } from './BenefitsItem';
export const BenefitsGrid = () => {
  return (
    <Grid container justifyItems="center" alignItems="center" sx={{ mt: 4 }}>
      <BenefitsItem
        title="Fast Delivery"
        subtitle="Start from $199"
        icon={<LocalShippingOutlined sx={{ fontSize: '2.3rem' }} />}
      />
      <BenefitsItem
        title="Money Guarantee"
        subtitle="7 Days Back"
        icon={<SavingsOutlined sx={{ fontSize: '2.3rem' }} />}
      />
      <BenefitsItem
        title="New Products"
        subtitle="Every week"
        icon={<CheckroomOutlined sx={{ fontSize: '2.3rem' }} />}
      />
      <BenefitsItem
        title="Payments"
        subtitle="Secure system"
        icon={<CreditScoreOutlined sx={{ fontSize: '2.3rem' }} />}
      />
    </Grid>
  );
};
