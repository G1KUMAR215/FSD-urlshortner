import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ShortenUrl from './components/UrlShortener/ShortenUrl';
import UrlList from './components/UrlShortener/UrlList';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        URL Shortener
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shorten" element={<ShortenUrl />} />
                    <Route path="/urls" element={<UrlList />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
