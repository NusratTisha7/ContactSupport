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
import { editIsReplied } from '../../api/supportApi';


export default function Reply({ open, handleClose, supportId }) {

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

    function onSubmit(reply) {
        reply.isReplied=true
        editIsReplied(reply,supportId).then(res=>{
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
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Reply
                                </Typography>
                                {errors.credential && <span style={{ color: "red", textAlign: "center" }}>{errors.credential?.message}</span>}
                                <Box
                                    sx={{ mt: 3 }}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="reply"
                                                    label="Write your reply here..."
                                                    name="reply"
                                                    autoComplete="reply"
                                                    {...register("reply", { required: "Field is not allowed to be empty" })}
                                                    error={Boolean(errors.reply)}
                                                    helperText={errors.reply?.message}
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
                                            Reply
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Typography>
            </Box>
        </Modal>
    )
}