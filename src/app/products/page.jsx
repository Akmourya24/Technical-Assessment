"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Box,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
  Container,
  Typography,
  Stack,
  InputAdornment,
  Paper
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import ProductCard from '../../components/productCart.jsx';
import { useProductsStore } from '../../stores/useProductsStore.jsx';

// Helper hook for search delay
function useDebounced(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 8; 
  const skip = (page - 1) * limit;
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounced(searchTerm, 500);
  const [category, setCategory] = useState('');

  // Store access
  const { fetchProducts, fetchCategories, categories, loading } = useProductsStore();

  const [productsData, setProductsData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Load categories once on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Optimization: Load Data function wrapped in useCallback
  const loadData = useCallback(async () => {
    const data = await fetchProducts({ limit, skip, q: debouncedSearch, category });
    if (data) {
      setProductsData(data);
      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [page, debouncedSearch, category, fetchProducts, limit, skip]);

  // Trigger load when dependencies change
  useEffect(() => {
    let mounted = true;
    if(mounted) loadData();
    return () => { mounted = false; };
  }, [loadData]);

  // Handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((e, v) => {
    setPage(v);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Products Catalog</Typography>
          <Typography variant="body2" color="text.secondary">Browse and manage inventory items</Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', md: 'auto' }}>
           <TextField
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 250, bgcolor: 'background.paper' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment>,
            }}
          />

          <TextField
            select
            size="small"
            value={category}
            onChange={handleCategoryChange}
            sx={{ minWidth: 200, bgcolor: 'background.paper' }}
            InputProps={{
                startAdornment: <InputAdornment position="start"><FilterList color="action" /></InputAdornment>,
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                {cat.replace('-', ' ')}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      {/* Grid Content */}
      {loading && !productsData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {productsData?.products?.length > 0 ? (
              productsData.products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  {/* Memoized Card */}
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent' }} elevation={0}>
                  <Typography variant="h6" color="text.secondary">No products found.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>

          {productsData?.products?.length > 0 && (
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                showFirstButton 
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}