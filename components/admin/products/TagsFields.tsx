import { FormData } from '@/interfaces';
import { TextField, Box, Chip } from '@mui/material';
import { errors } from 'jose';
import React, { Dispatch, SetStateAction } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  newTagValue: string;
  setNewTagValue: Dispatch<SetStateAction<string>>;
  getValues: UseFormGetValues<FormData>;
  onNewTag: () => void;
  onDeleteTag: (tag: string) => void;
}

export const TagsFields: React.FC<Props> = ({
  register,
  errors,
  newTagValue,
  setNewTagValue,
  getValues,
  onDeleteTag,
  onNewTag,
}) => {
  return (
    <>
      <TextField
        label="Slug - URL"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        {...register('slug', {
          required: 'This field is required',
          validate: val =>
            val.trim().includes(' ') ? 'Cannot have blank spaces' : undefined,
        })}
        error={!!errors.slug}
        helperText={errors.slug?.message}
      />

      <TextField
        label="Tags"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        helperText="Press [spacebar] to add"
        value={newTagValue}
        onChange={({ target }) => setNewTagValue(target.value)}
        onKeyDown={({ code }) => (code === 'Space' ? onNewTag() : undefined)}
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
    </>
  );
};
