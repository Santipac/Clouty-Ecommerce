/* eslint-disable react/no-unescaped-entities */
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Teslo-Shop | Search"
      pageDescription="Find the best Tesla's products here"
    >
      <Typography variant="h1" component="h1">
        Search Products
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Term: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            we couldn't find any products with this term:
          </Typography>
          <Typography variant="h2" sx={{ mb: 1, ml: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  let products = await dbProducts.getProductsByTerm(query);

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
