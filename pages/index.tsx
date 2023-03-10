import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Box, Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
export default function Home() {
  const { products, error, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title="Clouty Shop | Home"
      pageDescription="The Best Clouty products in one place"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: 3, pb: 2 }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold">
          New Arrivals
        </Typography>
        <NextLink href="/products" passHref legacyBehavior>
          <Link>
            {' '}
            <Button color="info" size="medium" sx={{ mt: 1, mb: 2 }}>
              View All
            </Button>
          </Link>
        </NextLink>
      </Box>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products.slice(0, 5)} />
      )}
      <Box display="flex" justifyContent="center" sx={{ mt: 16 }}>
        <Typography
          variant="h5"
          component="h2"
          textAlign="center"
          maxWidth="55%"
          lineHeight={2}
        >
          Clouty is a clothing ecommerce developed by{' '}
          <strong>
            <NextLink
              href={'https://santiagopacini.vercel.app/'}
              target="_blank"
              passHref
              legacyBehavior
            >
              <Link color="secondary">Santiago Pacini</Link>
            </NextLink>
          </strong>
          , this store <strong>is not real</strong> is just a personal project
          that has a lot of effort, passion and long hours of coding.
        </Typography>
      </Box>
    </ShopLayout>
  );
}
