import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios"
import Swal from 'sweetalert2'
const Login = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        function login() {
            const jsondata = {
                username: data.get("username"),
                password: data.get("password"),
            }
            axios.post('http://127.0.0.1:3002/login',
                jsondata
            )
                .then(response => {
                    const data = response.data
                    if (data.status == "success") {
                        Swal.fire({
                            title: 'Login สำเร็จ',
                            icon: 'success',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.setItem('token', data.token)
                                localStorage.setItem('user_id', data.user_id)
                                localStorage.setItem('user',JSON.stringify(data.user) )
                                window.location = '/backend/user'
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Login ไม่สำเร็จ',
                            text: 'กรุณาลองใหม่อีกครั้ง',
                            icon: 'error',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload()
                            }
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        login()
    };
    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="Username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login