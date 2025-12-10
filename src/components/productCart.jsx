import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Rating, 
  Box, 
  Chip, 
  Stack 
} from '@mui/material';
import Link from 'next/link';
import { Visibility } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: 200, objectFit: 'cover', bgcolor: '#f5f5f5' }}
          loading="lazy" // Performance: Lazy load off-screen images
        />
        <Chip 
          label={product.category} 
          size="small" 
          color="primary" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            textTransform: 'capitalize',
            fontSize: '0.7rem'
          }} 
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap gutterBottom>
          {product.title}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Rating value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            ({product.rating})
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
           <Typography variant="h6" color="primary.main" fontWeight="bold">
            ${product.price}
          </Typography>
          <Typography variant="caption" color="success.main" fontWeight="bold">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Link href={`/products/${product.id}`} passHref style={{ width: '100%', textDecoration: 'none' }}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<Visibility />}
            size="small"
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

// Optimization: React.memo ensures the card only re-renders if 'product' prop changes.
// Useful when filtering or paginating large grids.
export default React.memo(ProductCard);