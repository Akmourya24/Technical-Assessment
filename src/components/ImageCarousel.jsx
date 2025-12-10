import React, { useState } from 'react';
import { Box, MobileStepper, Button, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export function ImageCarousel({ images = [] }) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  if (!images.length) return null;

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Paper 
        variant="outlined" 
        sx={{ 
          height: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: '#fafafa',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2
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
        />
      )}
    </Box>
  );
}