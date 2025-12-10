"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { useUserStore } from '../../stores/useUserStore.jsx';
import UserDetailView from '../users/[id].jsx/page.jsx';

// --- Sub-Component: Memoized Table Row ---
// Optimization: Prevents unnecessary re-renders of rows when parent state changes
const UserTableRow = React.memo(({ user, onViewDetails }) => {
  return (
    <TableRow hover>
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
          <IconButton color="primary" size="small" onClick={() => onViewDetails(user.id)}>
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});

UserTableRow.displayName = 'UserTableRow';

// --- Main Component ---
const Users = () => {
  // Local UI State
  const [view, setView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Data State (from Store + Local for list display)
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Access Store
  const { fetchUsers, fetchUserDetails, loading } = useUserStore();

  // Optimization: useCallback prevents function recreation on re-renders
  const loadData = useCallback(async () => {
    const data = await fetchUsers({ page, rowsPerPage, searchQuery });
    if (data) {
      setUsers(data.users);
      setTotalUsers(data.total);
    }
  }, [page, rowsPerPage, searchQuery, fetchUsers]);

  // Debounce logic for search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 500); 
    return () => clearTimeout(timer);
  }, [loadData]);

  // Handlers wrapped in useCallback
  const handleViewDetails = useCallback(async (id) => {
    const data = await fetchUserDetails(id);
    if (data) {
      setSelectedUser(data);
      setView('detail');
    }
  }, [fetchUserDetails]);

  const handleBackToList = useCallback(() => {
    setView('list');
    setSelectedUser(null);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on new search
  }, []);

  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);


  // --- Render ---

  if (view === 'detail' && selectedUser) {
    return <UserDetailView user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">User Directory</Typography>
          <Typography variant="body2" color="text.secondary">Optimized with Caching & Memoization</Typography>
        </Box>
        <TextField
          placeholder="Search users..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
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
              {loading && users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <UserTableRow 
                    key={user.id} 
                    user={user} 
                    onViewDetails={handleViewDetails} 
                  />
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
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Container>
  );
};

export default Users;