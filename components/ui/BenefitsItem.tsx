import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  icon: JSX.Element;
}

export const BenefitsItem: React.FC<Props> = ({ title, subtitle, icon }) => {
  return (
    <Grid
      item
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      paddingY={4}
      marginY={{ xs: 1, md: 0 }}
      xs={12}
      sm={6}
      md={3}
      bgcolor="#f8f8f8"
      flexWrap="wrap"
    >
      {icon}
      <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Box>
    </Grid>
  );
};
