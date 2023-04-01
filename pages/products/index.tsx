import React from 'react';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const ProductsPage = () => {
  const { products, error, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="Clouty Shop | All Products"
      pageDescription="All products of Clouty for shopping"
    >
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        All Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default ProductsPage;
