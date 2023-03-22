import { CartContext } from '@/context';
import { ICartProduct, IOrderItem } from '@/interfaces';
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
import React, { useContext, useEffect, useState } from 'react';
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}
export const CartList: React.FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {hasMounted &&
        productsToShow.map(product => (
          <Grid
            container
            spacing={2}
            key={product.slug + product.size}
            sx={{ mb: 1 }}
          >
            <Grid item xs={3}>
              <NextLink
                href={`/product/${product.slug}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
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
                  Size: <strong>{product.size}</strong>
                </Typography>

                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={5}
                    updatedQuantity={newValue =>
                      onNewCartQuantityValue(product as ICartProduct, newValue)
                    }
                  />
                ) : (
                  <Typography variant="h6">
                    {product.quantity} item(s)
                  </Typography>
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
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    removeCartProduct(product as ICartProduct);
                  }}
                >
                  Remove
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
};
