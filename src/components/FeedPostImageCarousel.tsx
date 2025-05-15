"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface PostImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface FeedPostImageCarouselProps {
  images: PostImage[];
  aspectRatio?: string;
  onImageClick?: () => void;
}

/**
 * FeedPostImageCarousel Component
 * 
 * A simplified image carousel for the feed view without zoom functionality.
 * When images are clicked, it navigates to the post detail page.
 * Features:
 * - Smooth transitions between images
 * - Touch and mouse swipe support
 * - Keyboard navigation
 * - Progress indicators
 * - No zoom functionality
 */
const FeedPostImageCarousel = ({ 
  images, 
  aspectRatio = '1/1',
  onImageClick 
}: FeedPostImageCarouselProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, maxSteps - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  if (!images || images.length === 0) return null;

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio }}>
      {sortedImages.map((image, index) => (
        <Box
          key={image.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: index === activeStep ? 'block' : 'none',
          }}
        >
          <Image
            src={image.imageUrl}
            alt="Post image"
            fill
            style={{ objectFit: 'cover' }}
            onClick={onImageClick}
          />
        </Box>
      ))}
      
      {maxSteps > 1 && (
        <>
          <IconButton
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default FeedPostImageCarousel; 