"use client";
import React from 'react';
import {
  Container,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
  Avatar,
  Typography,
  Chip,
  Divider,
  Grid
} from '@mui/material';
import {
  ArrowBack,
  Public,
  Person,
  Business,
  LocationOn
} from '@mui/icons-material';

// Optimization: Defined outside component to avoid recreation on every render
const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="body2" color="text.secondary" fontWeight="medium">
      {label}
    </Typography>
    <Typography variant="body2" color="text.primary" fontWeight="bold" textAlign="right">
      {value || '-'}
    </Typography>
  </Box>
);

const UserDetailView = ({ user, onBack }) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={onBack} 
        sx={{ mb: 3 }} 
        variant="outlined"
      >
        Back to Users
      </Button>

      <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', height: 100 }} />
        
        <CardContent sx={{ p: 4, mt: -8 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-end" mb={4}>
            <Avatar 
              src={user.image} 
              sx={{ width: 140, height: 140, border: '4px solid white', boxShadow: 3 }} 
            />
            <Box pb={1} textAlign={{ xs: 'center', sm: 'left' }} flexGrow={1}>
              <Typography variant="h4" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>
              
              <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" gap={1}>
                <Chip label={user.gender} color={user.gender === 'male' ? 'info' : 'secondary'} size="small" sx={{ textTransform: 'capitalize' }} />
                <Chip label={`${user.age} Years`} variant="outlined" size="small" />
                <Chip icon={<Public fontSize="small" />} label={user.address?.country || 'USA'} color="success" size="small" />
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <Person sx={{ mr: 1 }} /> Personal
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone" value={user.phone} />
                <InfoRow label="Birth Date" value={user.birthDate} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <Business sx={{ mr: 1 }} /> Work
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Company" value={user.company?.name} />
                <InfoRow label="Title" value={user.company?.title} />
                <InfoRow label="Department" value={user.company?.department} />
              </Stack>
            </Grid>

            <Grid item xs={12}>
               <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1 }} /> Address
              </Typography>
              <Typography variant="body2" sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                {user.address?.address}, {user.address?.city}, {user.address?.state} {user.address?.postalCode}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

// Optimization: Memoize the component
export default React.memo(UserDetailView);