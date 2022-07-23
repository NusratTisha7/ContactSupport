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
import { editUser } from '../../api/userApi';
import { useForm } from "react-hook-form";


export default function EditSupport({ open, handleClose,userId }) {

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
        editUser(data, userId)
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
                                            Edit User
                                        </Typography>
                                        <Box
                                            sx={{ mt: 3 }}>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            id="userName"
                                                            label="User Name"
                                                            name="userName"
                                                            autoComplete="userName"
                                                            {...register("userName", { required: false })}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            id="fullName"
                                                            label="Full Name"
                                                            name="fullName"
                                                            autoComplete="fullName"
                                                            {...register("fullName", { required: false })}
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
                                                    Edit
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