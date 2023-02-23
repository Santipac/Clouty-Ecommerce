import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';
import React from 'react';

const MenPage = () => {
  const { products, error, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Teslo Shop | Men'}
      pageDescription={"The Best Tesla's products for Men"}
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Men
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
