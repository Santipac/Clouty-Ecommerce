import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { clothesApi } from '@/api';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';
type FormData = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    router.replace('/');
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px, 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create Account
              </Typography>
              <Chip
                label="We couldn't create your user"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ marginTop: 2, display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: '2 characters at least',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link underline="always">Do you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
