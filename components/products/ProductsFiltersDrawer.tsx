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
} from '@mui/material';
import React, { useState } from 'react';

interface Props {
  filterMenuOpen: boolean;
  handleFilterMenu: () => void;
}

export const ProductsFiltersDrawer: React.FC<Props> = ({
  filterMenuOpen,
  handleFilterMenu,
}) => {
  const [value, setValue] = React.useState<number[]>([0, 225]);

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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
            >
              <MenuItem value={'Men'}>Men</MenuItem>
              <MenuItem value={'Women'}>Women</MenuItem>
              <MenuItem value={'Kid'}>Kids</MenuItem>
              <MenuItem value={'Unisex'}>Unisex</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 4 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
            >
              <MenuItem value={'shirts'}>Shirts</MenuItem>
              <MenuItem value={'pants'}>Pants</MenuItem>
              <MenuItem value={'hoodies'}>Hoodies</MenuItem>
              <MenuItem value={'hats'}>Hats</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Size"
            >
              <MenuItem value={'XS'}>XS</MenuItem>
              <MenuItem value={'S'}>S</MenuItem>
              <MenuItem value={'M'}>M</MenuItem>
              <MenuItem value={'L'}>L</MenuItem>
              <MenuItem value={'XL'}>XL</MenuItem>
              <MenuItem value={'XXL'}>XXL</MenuItem>
              <MenuItem value={'XXXL'}>XXXL</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 4 }}>
            <Typography gutterBottom>Max. Price</Typography>
            <Slider
              valueLabelDisplay="auto"
              max={225}
              aria-label="custom thumb label"
              defaultValue={225}
            />
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            paddingY: 2,
            borderRadius: '5px',
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};
