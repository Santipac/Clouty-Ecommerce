import { FormData } from '@/interfaces';
import { TextField } from '@mui/material';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const NameAndDescriptionFields: React.FC<Props> = ({
  register,
  errors,
}) => {
  return (
    <>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        {...register('title', {
          required: 'This field is required',
          minLength: { value: 2, message: 'Min 2 characters' },
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        sx={{ mb: 5 }}
        {...register('description', {
          required: 'This field is required',
          minLength: { value: 2, message: 'Min 2 characters' },
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </>
  );
};
