import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';
import React from 'react';

const KidsPage: React.FC = () => {
  const { products, error, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title={'Teslo Shop | Kids'}
      pageDescription={"The Best Tesla's products for Kids"}
    >
      <Typography variant="h1" component="h1" marginBottom={2}>
        Kids
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsPage;
