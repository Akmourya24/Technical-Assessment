"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use 'next/router' for Pages Router
import { Box, CircularProgress } from '@mui/material';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // 1. Check Zustand Store (Local Storage)
    if (!isAuthenticated) {
      router.replace('/auth/signin'); // Redirect if no token found
    } else {
      setIsVerified(true); // Token exists, allow rendering
    }
  }, [isAuthenticated, router]);

  // 2. Show loading only until we verify the token exists
  if (!isAuthenticated || !isVerified) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. Render the protected page
  return <>{children}</>;
}