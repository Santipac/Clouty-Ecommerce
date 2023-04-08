import React, { useEffect, useState } from 'react';
import { ShopLayout } from '@/components/layouts';
import {
  FormData,
  ProductList,
  ProductsFiltersDrawer,
} from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import { IProduct, ISize } from '@/interfaces';

const ProductsPage = () => {
  const handleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [price, setPrice] = useState('default');

  let { products, error, isLoading } = useProducts(
    `/products?gender=${category}&type=${type}&price=${price}`
  );
  const maxPrice = products.reduce((precioActual, producto) => {
    return producto.price > precioActual ? producto.price : precioActual;
  }, 0);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  if (error) {
    return (
      <ShopLayout
        title="Clouty Shop | All Products"
        pageDescription="All products of Clouty for shopping"
      >
        <Box
          height="90vh"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h1" component="h1">
            Something went wrong...
          </Typography>
          <Typography variant="subtitle2" component="h2">
            Try Again refreshing this page
          </Typography>
        </Box>
      </ShopLayout>
    );
  }

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
            maxPrice={maxPrice}
            setCategory={setCategory}
            setType={setType}
            setPrice={setPrice}
          />
          {products.length === 0 ? (
            <Box width="100%" textAlign="center" sx={{ mt: 6 }}>
              <Typography variant="h1" component="h1">
                No products were found with the requested filters
              </Typography>
              <Typography variant="subtitle1">
                Try to set other filters or reset them.
              </Typography>
            </Box>
          ) : (
            <ProductList products={products} />
          )}
        </Box>
      )}
    </ShopLayout>
  );
};

export default ProductsPage;
