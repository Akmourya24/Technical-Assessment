"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Alert
} from '@mui/material';
import { 
  ArrowBack, 
  VerifiedUser, 
  Loop, 
  LocalShipping, 
  Comment,
  ShoppingCart,
  FlashOn
} from '@mui/icons-material';
import { ImageCarousel } from '../../../components/ImageCarousel.jsx';
import { useProductsStore } from '../../../stores/useProductsStore.jsx';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const fetchProductById = useProductsStore((s) => s.fetchProductById);
  const loading = useProductsStore((s) => s.loading);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    const controller = new AbortController();
    fetchProductById(id, controller.signal).then((data) => {
      if (mounted && data) setProduct(data);
    });
    return () => { mounted = false; controller.abort(); };
  }, [id, fetchProductById]);

  if (loading || !product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Top Bar */}
      <Link href="/products" passHref style={{ textDecoration: 'none' }}>
        <Button startIcon={<ArrowBack />} sx={{ mb: 3, color: 'text.secondary' }}>
          Back to Catalog
        </Button>
      </Link>

      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'visible' }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          
          {/* MASTER GRID CONTAINER - Starts the 2-Column Layout */}
          <Grid container spacing={6}>
            
            {/* ==============================================
                LEFT COLUMN: Image, Warranty, Reviews 
               ============================================== */}
            <Grid item xs={12} md={5} lg={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                
                {/* 1. The Image Carousel */}
                <ImageCarousel images={product.images} />

                {/* 2. Warranty & Policies (Below Image) */}
                <Paper variant="outlined" sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px dashed #ccc' }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                    Buyer Protection
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><VerifiedUser fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Warranty" 
                        secondary={product.warrantyInformation || "1 Year Standard Warranty"} 
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><Loop fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Returns" 
                        secondary={product.returnPolicy || "30-Day Returns"} 
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><LocalShipping fontSize="small" color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Shipping" 
                        secondary={product.shippingInformation || "Free Shipping"} 
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      />
                    </ListItem>
                  </List>
                </Paper>

                {/* 3. Reviews Snapshot (Below Image) */}
                {product.reviews && product.reviews.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom display="flex" alignItems="center">
                      <Comment fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> 
                      Recent Reviews
                    </Typography>
                    <Stack spacing={2}>
                      {product.reviews.slice(0, 2).map((review, idx) => (
                        <Paper key={idx} elevation={0} sx={{ p: 2, bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2 }}>
                          <Stack direction="row" justifyContent="space-between" mb={0.5}>
                              <Typography variant="caption" fontWeight="bold">{review.reviewerName}</Typography>
                              <Rating value={review.rating} size="small" readOnly sx={{ fontSize: '1rem' }} />
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                            "{review.comment}"
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* ==============================================
                RIGHT COLUMN: Title, Price, Description 
               ============================================== */}
            <Grid item xs={12} md={7} lg={8}>
              <Box>
                {/* Header: Category & Stock */}
                <Stack direction="row" spacing={1} mb={2}>
                   <Chip 
                     label={product.category} 
                     color="primary" 
                     size="small" 
                     sx={{ textTransform: 'capitalize', fontWeight: 600 }} 
                   />
                   <Chip 
                    label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
                    color={product.stock > 0 ? 'success' : 'error'} 
                    variant="outlined"
                    size="small" 
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                {/* Product Title */}
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                  {product.title}
                </Typography>
                
                {/* Rating & Brand Line */}
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Rating value={product.rating} readOnly precision={0.1} />
                  <Typography variant="body2" color="text.secondary">
                    {product.rating} Rating &nbsp;|&nbsp; Brand: <strong>{product.brand || 'Generic'}</strong>
                  </Typography>
                </Stack>

                {/* Price Box */}
                <Box mb={4} p={3} bgcolor="#f0f7ff" borderRadius={3} border="1px solid #e1effe">
                  <Stack direction="row" alignItems="baseline" spacing={2}>
                    <Typography variant="h3" color="primary.main" fontWeight="800">
                      ${product.price}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <>
                        <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through', opacity: 0.7 }}>
                          ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
                        </Typography>
                         <Chip 
                          label={`${product.discountPercentage}% OFF`} 
                          color="error" 
                          size="small" 
                          sx={{ fontWeight: 'bold', height: 24 }} 
                        />
                      </>
                    )}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Inclusive of all taxes. 
                  </Typography>
                </Box>

                {/* Main Actions */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<ShoppingCart />}
                    sx={{ py: 1.5, px: 4, fontWeight: 'bold', borderRadius: 2 }}
                    disableElevation
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    startIcon={<FlashOn />}
                    sx={{ py: 1.5, px: 4, fontWeight: 'bold', borderRadius: 2, borderWidth: 2 }}
                  >
                    Buy Now
                  </Button>
                </Stack>

                <Divider sx={{ my: 4 }} />

                {/* Description */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>Product Description</Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                  {product.description}
                </Typography>

                {/* Technical Specs Grid */}
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>Specifications</Typography>
                <Grid container spacing={2}>
                   <Grid item xs={6} sm={4}>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                        <Typography variant="caption" color="text.secondary" display="block">SKU</Typography>
                        <Typography variant="body2" fontWeight="bold">{product.sku}</Typography>
                      </Paper>
                   </Grid>
                   <Grid item xs={6} sm={4}>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Weight</Typography>
                        <Typography variant="body2" fontWeight="bold">{product.weight}g</Typography>
                      </Paper>
                   </Grid>
                   <Grid item xs={6} sm={4}>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Min Order</Typography>
                        <Typography variant="body2" fontWeight="bold">{product.minimumOrderQuantity} Units</Typography>
                      </Paper>
                   </Grid>
                   <Grid item xs={6} sm={4}>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Dimensions</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {product.dimensions?.width} x {product.dimensions?.height} cm
                        </Typography>
                      </Paper>
                   </Grid>
                </Grid>

              </Box>
            </Grid>
            {/* END RIGHT COLUMN */}

          </Grid>
          {/* END MASTER GRID CONTAINER */}

        </CardContent>
      </Card>
    </Container>
  );
}