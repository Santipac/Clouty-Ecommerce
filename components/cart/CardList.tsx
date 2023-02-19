import { initialData } from '@/database/products';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.products[4],
  initialData.products[2],
  initialData.products[0],
];

interface Props {
  editable: boolean;
}
export const CardList: React.FC<Props> = ({ editable }) => {
  return (
    <>
      {productsInCart.map(product => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    sx={{ borderRadius: '5px' }}
                    component="img"
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>M</strong>
              </Typography>

              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h6">3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
