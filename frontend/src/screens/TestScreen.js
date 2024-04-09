import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';

const CustomRating = () => {
 const value =4;
 const text = 4;
  return (
    <Box display="flex" alignItems="center" mt={1}>
      <Rating value={value} precision={0.5} readOnly />
      <Typography variant="body2" color="textSecondary" style={{ marginLeft: 1 }}>
        {text} reviews
      </Typography>
    </Box>
  );
};

export default CustomRating;