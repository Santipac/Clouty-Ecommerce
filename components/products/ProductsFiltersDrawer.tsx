import { ISize } from '@/interfaces';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Typography,
  Drawer,
  Button,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface FormData {
  gender: string;
  type: string;
  price: string;
  // size: ISize;
}

interface Props {
  filterMenuOpen: boolean;
  handleFilterMenu: () => void;
  maxPrice: number;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductsFiltersDrawer: React.FC<Props> = ({
  filterMenuOpen,
  handleFilterMenu,
  maxPrice,
  setCategory,
  setType,
  setPrice,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    resetField,
  } = useForm<FormData>();

  const onFilterSubmit = (filtersValues: FormData) => {
    setCategory(filtersValues.gender);
    setType(filtersValues.type);
    setPrice(filtersValues.price);
  };

  const onClearFilters = () => {
    setCategory('all');
    setType('all');
    setPrice('default');
    resetField('type');
    resetField('price');
    resetField('gender');
  };

  return (
    <Drawer
      open={filterMenuOpen}
      onClose={handleFilterMenu}
      anchor="right"
      sx={{
        backdropFilter: 'blur(4px)',
        transition: 'all 0.5s ease-out',
        paddingX: 3,
      }}
    >
      <form onSubmit={handleSubmit(onFilterSubmit)} style={{ height: '100%' }}>
        <Box
          sx={{ width: 300, height: '100%', paddingY: 5, paddingX: 3 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
              Filters
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Controller
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    {...field}
                  >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'men'}>Men</MenuItem>
                    <MenuItem value={'women'}>Women</MenuItem>
                    <MenuItem value={'kid'}>Kids</MenuItem>
                    <MenuItem value={'unisex'}>Unisex</MenuItem>
                  </Select>
                )}
                control={control}
                name="gender"
                defaultValue="all"
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 4 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Controller
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    {...field}
                  >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'shirts'}>Shirts</MenuItem>
                    <MenuItem value={'pants'}>Pants</MenuItem>
                    <MenuItem value={'hoodies'}>Hoodies</MenuItem>
                    <MenuItem value={'hats'}>Hats</MenuItem>
                  </Select>
                )}
                control={control}
                name="type"
                defaultValue="all"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Controller
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    {...field}
                  >
                    <MenuItem value={'default'}>Default</MenuItem>
                    <MenuItem value={'cheap'}>Cheapest to expensive</MenuItem>
                    <MenuItem value={'expensive'}>
                      Most expensive to cheapest
                    </MenuItem>
                  </Select>
                )}
                control={control}
                name="price"
                defaultValue="default"
              />
            </FormControl>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Size"
                    {...field}
                  >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'XS'}>XS</MenuItem>
                    <MenuItem value={'S'}>S</MenuItem>
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'L'}>L</MenuItem>
                    <MenuItem value={'XL'}>XL</MenuItem>
                    <MenuItem value={'XXL'}>XXL</MenuItem>
                    <MenuItem value={'XXXL'}>XXXL</MenuItem>
                  </Select>
                )}
                control={control}
                name="size"
                defaultValue="XS"
              />
            </FormControl> */}
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                borderRadius: '5px',
              }}
            >
              Apply Filters
            </Button>
            {isDirty && (
              <Button
                onClick={onClearFilters}
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                sx={{
                  borderRadius: '5px',
                  mt: 2,
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Drawer>
  );
};
