import { FC, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { AdminLayout } from '../../../components/layouts';
import { FormData, IGender, IProduct, ISize, IType } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Product } from '@/models';
import { useFormAdminProduct } from '@/hooks';
import { NameAndDescriptionFields } from '@/components/admin';
import {
  ImageField,
  StockAndPriceFields,
  TagsFields,
  TypeGenderAndSizesFields,
} from '../../../components/admin/products';

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({ defaultValues: product });

  const {
    isSaving,
    newTagValue,
    setNewTagValue,
    onChangeSizes,
    onDeleteImage,
    onDeleteTag,
    onFileSelected,
    onFormSubmit,
    onNewTag,
  } = useFormAdminProduct(setValue, getValues);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';
        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <AdminLayout
      pageDescription="Page for CRUD a Product"
      title={'Producto'}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <Toaster />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{
              width: '150px',
              cursor: isSaving ? 'not-allowed' : 'pointer',
            }}
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <NameAndDescriptionFields register={register} errors={errors} />

            <StockAndPriceFields register={register} errors={errors} />

            <Divider sx={{ my: 1 }} />

            <TypeGenderAndSizesFields
              setValue={setValue}
              getValues={getValues}
              onChangeSizes={onChangeSizes}
            />
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TagsFields
              register={register}
              errors={errors}
              newTagValue={newTagValue}
              setNewTagValue={setNewTagValue}
              getValues={getValues}
              onDeleteTag={onDeleteTag}
              onNewTag={onNewTag}
            />

            <Divider sx={{ my: 2 }} />

            <ImageField
              onFileSelected={onFileSelected}
              getValues={getValues}
              onDeleteImage={onDeleteImage}
            />
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg'];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
