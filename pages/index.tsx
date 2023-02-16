import { ShopLayout } from '@/components/layouts';
import { initialData } from '@/database/products';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

export default function Home() {
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
      <Grid container spacing={4}>
        {initialData.products.map(product => (
          <Grid item xs={6} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`products/${product.images[0]}`}
                  alt={product.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
}
