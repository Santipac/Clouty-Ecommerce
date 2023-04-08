import React, { useState } from 'react';
import { ShopLayout } from '@/components/layouts';
import { ProductList, ProductsFiltersDrawer } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Button, Grid, Typography } from '@mui/material';

const ProductsPage = () => {
  const { products, error, isLoading } = useProducts('/products');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const handleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };
  return (
    <ShopLayout
      title="Clouty Shop | All Products"
      pageDescription="All products of Clouty for shopping"
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Box display="flex" flexDirection="column">
          <Button
            color="primary"
            variant="contained"
            sx={{
              mb: 2,
              width: 'min-content',
              fontSize: '1rem',
            }}
            onClick={() => handleFilterMenu()}
          >
            Filters
          </Button>

          <ProductsFiltersDrawer
            filterMenuOpen={filterMenuOpen}
            handleFilterMenu={handleFilterMenu}
          />
          <ProductList products={products} />
        </Box>
      )}
    </ShopLayout>
  );
};

export default ProductsPage;
