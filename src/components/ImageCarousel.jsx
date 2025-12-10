import React, { useState } from 'react';
import { Box, MobileStepper, Button, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const ImageCarousel = ({ images = [] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  if (!images.length) return null;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Paper 
        variant="outlined" 
        sx={{ 
          height: 300, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: '#fff',
          borderRadius: 2,
          overflow: 'hidden',
          p: 2
        }}
      >
        <img 
          src={images[activeStep]} 
          alt={`product-img-${activeStep}`} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain', 
            display: 'block' 
          }} 
        />
      </Paper>
      
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          variant="dots"
          nextButton={
            <Button size="small" onClick={handleNext}>
              Next <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack}>
              <KeyboardArrowLeft /> Back
            </Button>
          }
          sx={{ bgcolor: 'transparent', p: 0 }}
        />
      )}
    </Box>
  );
};

// Optimization: Prevents carousel flicker/re-render when parent (Details Page) re-renders
export default React.memo(ImageCarousel);