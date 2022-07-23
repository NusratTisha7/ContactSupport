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
import { createSupport } from '../../api/supportApi';


export default function AddSupport({ open, handleClose, token, id }) {

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
        data.userID = id
        createSupport(data, token)
            .then(res => {
                handleClose()
                reset()
            })
    }

    let options = [
        { value: 'SignUp', label: 'SignUp' },
        { value: 'Login', label: 'Login' },
        { value: 'ForgetPassword', label: 'ForgetPassword' },
        { value: 'Account', label: 'Account' }
    ]

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
                                            Contact Support
                                        </Typography>
                                        {errors.credential && <span style={{ color: "red", textAlign: "center" }}>{errors.credential?.message}</span>}
                                        <Box
                                            sx={{ mt: 3 }}>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            id="email"
                                                            label="From email*"
                                                            name="fromEmail"
                                                            autoComplete="fromEmail"
                                                            {...register("fromEmail", { required: "Email is required" })}
                                                            error={Boolean(errors.fromEmail)}
                                                            helperText={errors.fromEmail?.message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            select
                                                            fullWidth
                                                            id="supportType"
                                                            label="Support Type"
                                                            name="supportType"
                                                            autoComplete="supportType"
                                                            {...register("supportType", { required: "Support Type is required" })}
                                                            error={Boolean(errors.supportType)}
                                                            helperText={errors.supportType?.message}
                                                        >
                                                            {options && options.map(item => {
                                                                return (
                                                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                                                )
                                                            })}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            name="supportText"
                                                            label="Support Text*"
                                                            type="supportText"
                                                            id="supportText"
                                                            autoComplete="supportText"
                                                            {...register("supportText", { required: "Support Text is required" })}
                                                            error={Boolean(errors.supportText)}
                                                            helperText={errors.supportText?.message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            name="status"
                                                            label="Status*"
                                                            type="status"
                                                            id="status"
                                                            autoComplete="status"
                                                            {...register("status", { required: "Support Text is required" })}
                                                            error={Boolean(errors.status)}
                                                            helperText={errors.status?.message}
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