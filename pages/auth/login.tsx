import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import AuthLayout from '@/components/layouts/AuthLayout';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

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

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    // const isValidLogin = await loginUser(email, password);
    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 5000);
    //   return;
    // }
    // const destination = router.query.page?.toString() || '/';
    // router.replace(destination);´
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box
          sx={{ maxWidth: 420, paddingY: '4rem', paddingX: '2rem' }}
          bgcolor="#fff"
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="1rem"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h1"
                textAlign="center"
                sx={{ mb: 4 }}
              >
                Log in
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
                size="large"
                fullWidth
                sx={{ ':hover': { backgroundColor: '#3658bd' } }}
              >
                Sign in
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.page
                    ? `/auth/register?page=${router.query.page}`
                    : '/auth/register'
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Dont have an account?</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ width: '100%', mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                fullWidth
                onClick={() => signIn('google')}
                sx={{ gap: 2, backgroundColor: '#fff7f7' }}
              >
                <FcGoogle size="25px" /> Sign in with Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => signIn('github')}
                sx={{ gap: 2, ':hover': { backgroundColor: '#000' } }}
              >
                <BsGithub size="25px" /> Sign in with Github
              </Button>
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

export default LoginPage;
