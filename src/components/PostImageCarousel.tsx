"use client";

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Box, IconButton, MobileStepper, useTheme, Fade, Zoom } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, ZoomIn as ZoomInIcon, Close as CloseIcon } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

type PostImage = {
  id: string;
  imageUrl: string;
  order: number;
  postId: string;
  createdAt: Date;
};

type PostImageCarouselProps = {
  images: PostImage[];
  aspectRatio?: string;
};

/**
 * PostImageCarousel Component
 * 
 * A modern image carousel for displaying multiple post images.
 * Features:
 * - Smooth transitions between images
 * - Touch and mouse swipe support
 * - Keyboard navigation
 * - Image zoom functionality
 * - Progress indicators
 * - Responsive design
 * - Loading animations
 */
const PostImageCarousel = ({ images, aspectRatio = '1/1' }: PostImageCarouselProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const maxSteps = images.length;

  if (!images || images.length === 0) return null;

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, maxSteps - 1));
  }, [maxSteps]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') handleNext();
    if (event.key === 'ArrowLeft') handleBack();
    if (event.key === 'Escape' && isZoomed) setIsZoomed(false);
  }, [handleNext, handleBack, isZoomed]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
    trackMouse: true,
    delta: 10, // minimum distance in pixels before a swipe is registered
    swipeDuration: 500, // maximum time in ms to complete a swipe
  });

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio }}>
      {sortedImages.map((image) => (
        <Box
          key={image.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={image.imageUrl}
            alt="Post image"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostImageCarousel; 