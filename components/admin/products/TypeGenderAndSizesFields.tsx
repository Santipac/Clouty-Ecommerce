import React from 'react';
import { FormData } from '@/interfaces';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { IType, IGender, ISize } from '@/interfaces';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  FormGroup,
  Box,
  Checkbox,
} from '@mui/material';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  onChangeSizes: (size: ISize) => void;
}
export const TypeGenderAndSizesFields: React.FC<Props> = ({
  getValues,
  setValue,
  onChangeSizes,
}) => {
  return (
    <>
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
        <Box display="flex">
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
        </Box>
      </FormGroup>
    </>
  );
};
