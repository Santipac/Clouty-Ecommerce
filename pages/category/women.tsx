import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';
import React from 'react';

const WomenPage = () => {
  const { products, error, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title={'Teslo Shop | Women'}
      pageDescription={"The Best Tesla's products for Women"}
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Women
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
