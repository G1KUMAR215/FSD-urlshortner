import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ShortenUrl = ({ token }) => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/url/shorten', { longUrl }, {
                headers: { 'x-auth-token': token }
            });
            setShortUrl(res.data.shortUrl);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Shorten URL
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Enter Long URL"
                        value={longUrl}
                        onChange={e => setLongUrl(e.target.value)}
                        variant="outlined"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Shorten URL
                    </Button>
                </form>
                {shortUrl && (
                    <Typography variant="h6" component="p" sx={{ mt: 3 }}>
                        Shortened URL: {shortUrl}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ShortenUrl;
