import React from 'react';
import { FormData } from '@/interfaces';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}
export const StockAndPriceFields: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
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
    </>
  );
};
