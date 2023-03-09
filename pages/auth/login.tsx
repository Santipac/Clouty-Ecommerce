import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { clothesApi } from '@/api';
import AuthLayout from '@/components/layouts/AuthLayout';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    router.replace('/');
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px, 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Login
              </Typography>
              <Chip
                label="This user is not recognized."
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ marginTop: 2, display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
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
                  minLength: {
                    value: 6,
                    message: '6 characters at least',
                  },
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
              <NextLink href="/auth/register" passHref legacyBehavior>
                <Link underline="always">Dont have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
