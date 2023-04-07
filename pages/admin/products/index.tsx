import NextLink from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { AdminLayout } from '@/components/layouts';
import { IProduct } from '@/interfaces';
import {
  AddOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Image',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
            sx={{ p: 1 }}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Category' },
  { field: 'inStock', headerName: 'In Stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error)
    return <Typography variant="subtitle1">Loading...</Typography>;

  if (!data)
    return (
      <AdminLayout
        title="Orders Admin"
        subTitle="Orders Administration"
        pageDescription="Orders administration for admins of Clouty Store"
        icon={<ConfirmationNumberOutlined />}
      >
        <Typography variant="subtitle1">Orders not found.</Typography>
      </AdminLayout>
    );

  const rows = data.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender.toUpperCase(),
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data.length}) `}
      subTitle="Products Administration"
      pageDescription="Products administration for admins of Clouty Store"
      icon={<CategoryOutlined />}
    >
      <Box
        display="flex"
        justifyContent="end"
        sx={{ mb: 2 }}
        className="fadeIn"
      >
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Create Product
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
