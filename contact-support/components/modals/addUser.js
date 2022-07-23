import { ThemeProvider } from "@emotion/react";
import { Card } from 'react-bootstrap'
import {
    TextField,
    MenuItem,
    Box,
    Container,
    Button,
    createTheme,
    CssBaseline,
    Typography,
    Grid,
    Modal
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createUser } from '../../api/userApi';


export default function AddUser({ open, handleClose }) {

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
    };

    function onSubmit(data) {
        data.totalSupport = 0
        createUser(data)
            .then(res => {
                handleClose()
                reset()
            })
    }

   

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description">
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box />
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
                                            Add User
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
                                                            label="User Name*"
                                                            name="userName"
                                                            autoComplete="userName"
                                                            {...register("userName", { required: "Username is required" })}
                                                            error={Boolean(errors.userName)}
                                                            helperText={errors.userName?.message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                    <TextField
                                                            fullWidth
                                                            id="fullName"
                                                            label="Full Name*"
                                                            name="fullName"
                                                            autoComplete="fullName"
                                                            {...register("fullName", { required: "fullName is required" })}
                                                            error={Boolean(errors.fullName)}
                                                            helperText={errors.fullName?.message}
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
                                                    {...register("password", {required: "password is required"})}
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
                                                    onClick={e => clearErrors('credential')}
                                                >
                                                    Add
                                                </Button>
                                            </form>
                                        </Box>
                                    </Box>
                                </Card.Body>
                            </Card>
                        </Container>
                    </ThemeProvider>
                </Typography>
            </Box>
        </Modal>
    )
}