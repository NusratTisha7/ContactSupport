import { Card } from "react-bootstrap";
import { ThemeProvider } from "@emotion/react";
import {
  TextField,
  Box,
  Container,
  Button,
  createTheme,
  CssBaseline,
  Typography,
  Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "../api/userApi";
import {authenticate} from '../utils/auth';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit, watch, setError, formState: { errors }, reset, clearErrors } = useForm();
  const theme = createTheme({
    palette: {
      primary: {
        light: '#70e1a9',
        main: '#004d25',
        dark: '#02361b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  function onSubmit(data) {
    login( data ).then(res => {
      authenticate(res.data.token,()=>[
        router.push('/add')
      ])
    }).catch(e => {
      console.log(e)
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ mt: 8 }} />
        <Card>
          <Card.Body>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              {errors.credential && <span style={{ color: "red", textAlign: "center" }}>{errors.credential?.message}</span>}
              <Box
                sx={{ mt: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="userName"
                        label="UserName*"
                        name="userName"
                        autoComplete="userName"
                        {...register("userName", { required: "userName is required" })}
                        error={Boolean(errors.userName)}
                        helperText={errors.userName?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password*"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", { required: "password is required" })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  // onClick={e => clearErrors('credential')}
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </Box>
          </Card.Body>
        </Card>
      </Container>
    </ThemeProvider>

  );
}