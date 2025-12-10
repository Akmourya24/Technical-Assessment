"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link'; 
import { useAuthStore } from '../../../stores/useAuthStore.jsx'; 

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Performance: Select strictly what you need to avoid re-renders
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    try {
      // Call DummyJSON login API
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        setError('Invalid credentials');
        setLoading(false);
        return;
      }

      const session = await res.json();

      if (session?.accessToken) {
        setAuth(session.accessToken, session);
        router.push('/users');
      } else {
        setError('Login failed');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  }, [router, setAuth]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 48 }} // Fixed height prevents layout shift
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/signup" passHref style={{ textDecoration: 'none', color: '#1976d2' }}>
                   Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, width: '100%' }}>
            <Typography variant="caption" display="block" color="text.secondary">
              Demo Credentials:
            </Typography>
            <Typography variant="body2" fontFamily="monospace">
              Username: <strong>emilys</strong><br />
              Password: <strong>emilyspass</strong>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}