// Notification.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity="success" 
        sx={{ 
          width: '100%', 
          fontSize: '1.25rem',  // Increase font size
          padding: '20px',      // Add padding
          minWidth: '300px',    // Minimum width for larger appearance
          maxWidth: '500px'     // Optional max width
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

