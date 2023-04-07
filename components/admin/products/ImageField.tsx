import { FormData } from '@/interfaces';
import { UploadOutlined } from '@mui/icons-material';
import {
  Box,
  FormLabel,
  Button,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { UseFormGetValues } from 'react-hook-form';

interface Props {
  onFileSelected: ({ target }: ChangeEvent<HTMLInputElement>) => Promise<void>;
  getValues: UseFormGetValues<FormData>;
  onDeleteImage: (image: string) => void;
}

export const ImageField: React.FC<Props> = ({
  onFileSelected,
  getValues,
  onDeleteImage,
}) => {
  return (
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
  );
};
