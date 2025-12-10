"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';

// Import the details component
import UserDetailView from './[id].jsx/page.jsx'; 

const Users = () => {
  const [view, setView] = useState('list');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch Logic
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const skip = page * rowsPerPage;
      const baseUrl = 'https://dummyjson.com/users';
      const url = searchQuery 
        ? `${baseUrl}/search?q=${searchQuery}&limit=${rowsPerPage}&skip=${skip}`
        : `${baseUrl}?limit=${rowsPerPage}&skip=${skip}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.users);
      setTotalUsers(data.total);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 500);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const fetchUserDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      setSelectedUser(data);
      setView('detail');
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handlePageChange = (e, newPage) => setPage(newPage);
  const handleRowsChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Render View Switcher
  if (view === 'detail' && selectedUser) {
    return <UserDetailView user={selectedUser} onBack={() => setView('list')} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">User Directory</Typography>
          <Typography variant="body2" color="text.secondary">Manage users and view full profiles</Typography>
        </Box>
        <TextField
          placeholder="Search users..."
          size="small"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
          sx={{ width: { xs: '100%', md: 300 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
        />
      </Stack>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={user.image} sx={{ width: 35, height: 35 }} />
                        <Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.gender} size="small" sx={{ textTransform: 'capitalize' }} />
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Full Details">
                        <IconButton color="primary" size="small" onClick={() => fetchUserDetails(user.id)}>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalUsers}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsChange}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Container>
  );
};

export default Users;