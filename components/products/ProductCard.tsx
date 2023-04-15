import { IProduct } from '@/interfaces';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React, { useMemo, useState } from 'react';

interface Props {
  product: IProduct;
}
export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [isHovered, product.images]);
  return (
    <Grid
      item
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      xs={6}
      sm={4}
    >
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          passHref
          legacyBehavior
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              {product.inStock === 0 ? (
                <Chip
                  color="primary"
                  label="Not available"
                  sx={{
                    position: 'absolute',
                    zIndex: 99,
                    top: '10px',
                    left: '10px',
                  }}
                />
              ) : null}

              <CardMedia
                className="fadeIn"
                component="img"
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography
          fontWeight={700}
          sx={{ fontSize: { xs: '.8rem', sm: '1rem' } }}
        >
          {product.title}
        </Typography>
        <Typography
          fontWeight={500}
          sx={{ fontSize: { xs: '.8rem', sm: '1rem' } }}
        >
          ${product.price}
        </Typography>
      </Box>
    </Grid>
  );
};
