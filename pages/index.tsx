import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

export default function Home() {
  const { products, error, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="Teslo-Shop | Home"
      pageDescription="The Best Tesla's products in one place"
    >
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        All Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
