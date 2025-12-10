/*
Products list + product detail pages (JavaScript, Next.js, MUI, Zustand)
Files included in this single document for easy copy-paste:

1) stores/useProductsStore.js
2) components/ProductCard.jsx
3) components/ImageCarousel.jsx
4) pages/products/index.jsx    -> products list with pagination, search, category filter
5) pages/products/[id].jsx    -> product detail page with images carousel

Requirements met:
- Uses DummyJSON endpoints:
  - GET /products?limit=10&skip=0
  - GET /products/search?q=...
  - GET /products/category/{category}
  - GET /products/{id}
- Responsive MUI grid layout
- Pagination (limit & skip)
- Search bar with debounce
- Category filter dropdown (fetches categories)
- Shows image, title, price, category, rating
- Product detail shows carousel, description, specs and "Back to Products" link
- Basic caching in Zustand to avoid re-fetching pages/categories/products

Place each section into the corresponding file in your Next.js project.
Make sure `utils/api.js` exists (from previous snippet) and `useAuthStore` exists if you need token injection (not required for DummyJSON product endpoints).

Install dependencies if not present:
- @mui/material @mui/icons-material zustand react-responsive-carousel (optional)

*/


"use client"
import React, { useState, useEffect } from 'react';
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
import { useProductsStore } from '../../stores/useProductsStore.jsx'

// Debounce Hook
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
  const limit = 8; // Fits grid better (4x2)
  const skip = (page - 1) * limit;
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounced(searchTerm, 500);
  const [category, setCategory] = useState('');

  // Store selectors (avoid subscribing to whole store)
  const fetchProducts = useProductsStore((s) => s.fetchProducts);
  const fetchCategories = useProductsStore((s) => s.fetchCategories);
  const categories = useProductsStore((s) => s.categories);
  const loading = useProductsStore((s) => s.loading);

  const [productsData, setProductsData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Initial Category Load
  useEffect(() => {
    const controller = new AbortController();
    fetchCategories(controller.signal);
    return () => controller.abort();
  }, [fetchCategories]);

  // Fetch Products Effect
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const load = async () => {
      const data = await fetchProducts({ limit, skip, q: debouncedSearch, category }, controller.signal);
      if (mounted && data) {
        setProductsData(data);
        setTotalPages(Math.ceil(data.total / limit));
      }
    };
    load();
    return () => { mounted = false; controller.abort(); };
  }, [page, debouncedSearch, category, fetchProducts, limit, skip]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Products Catalog</Typography>
          <Typography variant="body2" color="text.secondary">Browse and manage inventory items</Typography>
        </Box>

        {/* Filter Toolbar */}
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

      {/* Content Area */}
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
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent' }} elevation={0}>
                  <Typography variant="h6" color="text.secondary">No products found matching your criteria.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>

          {/* Pagination */}
          {productsData?.products?.length > 0 && (
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(e, v) => setPage(v)} 
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