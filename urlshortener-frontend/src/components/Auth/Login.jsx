import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            setToken(res.data.token);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        variant="outlined"
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
