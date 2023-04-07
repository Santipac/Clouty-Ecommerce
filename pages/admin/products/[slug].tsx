import { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import { GetServerSideProps } from 'next';
import { AdminLayout } from '../../../components/layouts';
import { IGender, IProduct, ISize, IType } from '../../../interfaces';
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { dbProducts } from '../../../database';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { CloutyApi } from '@/api';
import { Product } from '@/models';
import { useRouter } from 'next/router';
import { trusted } from 'mongoose';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: IGender;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({ defaultValues: product });

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

  const onChangeSizes = (size: ISize) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter(s => s !== size),
        { shouldValidate: true }
      );
    }
    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');
    if (currentTags.includes(newTag)) return;
    currentTags.push(newTag);
  };
  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await CloutyApi.post<{ message: string }>(
          '/admin/upload',
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter(img => img !== image),
      { shouldValidate: true }
    );
  };

  const onFormSubmit = async (form: FormData) => {
    if (form.images.length < 2) {
      return toast.error('You have to upload 2 images at least.');
    }
    setIsSaving(true);
    try {
      const { data } = await CloutyApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });
      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

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
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Min 2 characters' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Min 2 characters' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="InStock"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'This field is required',
                min: { value: 1, message: 'The Minimum value is 1' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'This field is required',
                min: { value: 1, message: 'The Minimum value is 1' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={e =>
                  setValue('type', e.target.value as IType, {
                    shouldValidate: true,
                  })
                }
              >
                {validTypes.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={e =>
                  setValue('gender', e.target.value as IGender, {
                    shouldValidate: true,
                  })
                }
              >
                {validGender.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map(size => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={getValues('sizes').includes(size as ISize)}
                    />
                  }
                  onChange={() => onChangeSizes(size as ISize)}
                  label={size}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required',
                validate: val =>
                  val.trim().includes(' ')
                    ? 'Cannot have blank spaces'
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyDown={({ code }) =>
                code === 'Space' ? onNewTag() : undefined
              }
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags').map(tag => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                component="label"
              >
                Choose Image
                <input
                  hidden
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: 'none' }}
                  onChange={onFileSelected}
                />
              </Button>

              <input
                hidden
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: 'none' }}
                onChange={onFileSelected}
              />

              <Chip
                label="You must have 2 images"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues('images').length < 2 ? 'flex' : 'none',
                }}
              />

              <Grid container spacing={2}>
                {getValues('images').map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(img)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
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
