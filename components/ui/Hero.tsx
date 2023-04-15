import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import HeroImage from '@/assets/HeroImage.jpg';
import { useRouter } from 'next/router';

export const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      mt={4}
      minHeight="70vh"
      borderRadius="1rem"
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
      <Typography
        variant="h3"
        component="h1"
        color="white"
        fontWeight="bold"
        textAlign="center"
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        Fashion without the hassle.
      </Typography>
      <Button
        size="medium"
        color="primary"
        sx={{ mt: 3, ':hover': { backgroundColor: '#000' } }}
        onClick={() => router.push('/products')}
      >
        Explore Products
      </Button>
    </Box>
  );
};
