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
  School,
  Person,
  FitnessCenter,
  Business,
  AccountBalance,
  LocationOn
} from '@mui/icons-material';

// Helper component for detail rows
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
        {/* Header Banner Area */}
        <Box sx={{ bgcolor: 'primary.main', height: 100 }} />
        
        <CardContent sx={{ p: 4, mt: -8 }}>
          {/* Profile Header */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-end" mb={4}>
            <Avatar 
              src={user.image} 
              sx={{ 
                width: 140, 
                height: 140, 
                border: '4px solid white', 
                boxShadow: 3 
              }} 
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
                <Chip icon={<School fontSize="small" />} label={user.university} size="small" />
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Detailed Info Grid */}
          <Grid container spacing={4}>
            
            {/* Column 1: Personal & Physical */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <Person sx={{ mr: 1 }} /> Personal Information
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone" value={user.phone} />
                <InfoRow label="Birth Date" value={user.birthDate} />
              </Stack>

              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center" sx={{ mt: 3 }}>
                <FitnessCenter sx={{ mr: 1 }} /> Physical Stats
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Blood Group" value={user.bloodGroup} />
                <InfoRow label="Height" value={`${user.height} cm`} />
                <InfoRow label="Weight" value={`${user.weight} kg`} />
                <InfoRow label="Eye Color" value={user.eyeColor} />
              </Stack>
            </Grid>

            {/* Column 2: Work & Company */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <Business sx={{ mr: 1 }} /> Company Details
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Company Name" value={user.company?.name} />
                <InfoRow label="Department" value={user.company?.department} />
                <InfoRow label="Job Title" value={user.company?.title} />
                
                <Divider sx={{ borderStyle: 'dashed' }} />
                
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">OFFICE LOCATION</Typography>
                  <Typography variant="body2">
                    {user.company?.address?.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company?.address?.city}, {user.company?.address?.state}
                  </Typography>
                </Box>
              </Stack>

               {/* Bank Section */}
               <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center" sx={{ mt: 3 }}>
                <AccountBalance sx={{ mr: 1 }} /> Financial
              </Typography>
              <Stack spacing={2} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <InfoRow label="Card Type" value={user.bank?.cardType} />
                <InfoRow label="Currency" value={user.bank?.currency} />
                <InfoRow label="IBAN" value={user.bank?.iban} />
              </Stack>
            </Grid>

            {/* Full Width: Home Address */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1 }} /> Home Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                   <Typography variant="subtitle2">Street Address</Typography>
                   <Typography variant="body2" color="text.secondary">{user.address?.address}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                   <Typography variant="subtitle2">City</Typography>
                   <Typography variant="body2" color="text.secondary">{user.address?.city}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                   <Typography variant="subtitle2">State/Code</Typography>
                   <Typography variant="body2" color="text.secondary">{user.address?.state} {user.address?.postalCode}</Typography>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetailView;