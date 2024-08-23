import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const UrlList = ({ token }) => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const res = await axios.get('/api/url/', {
                    headers: { 'x-auth-token': token }
                });
                setUrls(res.data);
            } catch (error) {
                console.error(error.response.data);
            }
        };
        fetchUrls();
    }, [token]);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your URLs
                </Typography>
                <List>
                    {urls.map(url => (
                        <ListItem key={url._id}>
                            <ListItemText
                                primary={`Short URL: ${url.shortUrl}`}
                                secondary={`Clicks: ${url.clicks}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default UrlList;
