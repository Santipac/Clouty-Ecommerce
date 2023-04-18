import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

type FormData = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
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
    await signIn('credentials', { email, password });

    // const destination = router.query.page?.toString() || '/';
    // router.replace(destination);
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box
          sx={{ width: 420, paddingY: '4rem', paddingX: '2rem' }}
          bgcolor="#fff"
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="1rem"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Create Account
              </Typography>
              <Box
                className="fadeIn"
                sx={{ marginTop: 2, display: showError ? 'flex' : 'none' }}
                width="fit-content"
                p=".5rem"
                borderRadius="10px"
                border="1px solid"
                borderColor="red"
              >
                <ErrorOutline color="error" />
                <Typography color="error" ml={2}>
                  We couldn&apos;t create your user
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
                sx={{ ':hover': { backgroundColor: '#3658bd' } }}
                size="large"
                fullWidth
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.page
                    ? `/auth/login?page=${router.query.page}`
                    : '/auth/login'
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Do you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { page = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
