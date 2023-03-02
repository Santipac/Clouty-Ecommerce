import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import HeroImage from '@/assets/HeroImage.jpg';

export const Hero: React.FC = () => {
  return (
    <Box
      mt={4}
      minHeight="70vh"
      borderRadius="3rem"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${HeroImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h3" component="h1" color="white" fontWeight="bold">
        Fashion without the hassle.
      </Typography>
      <Button size="medium" color="primary" sx={{ mt: 3 }}>
        Explore Products
      </Button>
    </Box>
  );
};
