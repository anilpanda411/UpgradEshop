// OrderConfirmation.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Stepper, Step, StepLabel, Box } from '@mui/material';
import Notification from './Notification'; // Import Notification component

const steps = ['Items', 'Select Address', 'Confirm Order'];

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationOpen, setNotificationOpen] = useState(false); // State to control notification visibility

  const { selectedProduct, quantity, selectedAddress } = location.state || {};

  if (!selectedProduct || !selectedAddress || !quantity) {
    return <Typography>No order details available.</Typography>;
  }

  const handlePlaceOrder = () => {
    setNotificationOpen(true); // Show notification
    setTimeout(() => navigate('/products'), 2000); // Redirect after 2 seconds
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false); // Close notification
  };

  return (
    <div className="order-confirmation-container">
      {/* Stepper */}
      <Box sx={{ width: '100%', marginBottom: '20px' }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Order Details */}
      <div className="order-details">
        <Typography variant="h4" gutterBottom>{selectedProduct.name}</Typography>
        <Typography variant="body1">Quantity: {quantity}</Typography>
        <Typography variant="body1">
          <strong>Category:</strong> {selectedProduct.category}
        </Typography>
        <Typography variant="body2" paragraph>{selectedProduct.description}</Typography>
        <Typography variant="h5" color="error" gutterBottom>
          <strong>Total Price:</strong> ₹{selectedProduct.price * quantity}
        </Typography>
      </div>

      {/* Address Details */}
      <div className="address-details">
        <Typography variant="h6"><strong>Address Details:</strong></Typography>
        <Typography variant="body1">{selectedAddress.name}</Typography>
        <Typography variant="body1">Contact Number: {selectedAddress.contactNumber}</Typography>
        <Typography variant="body1">{selectedAddress.street}, {selectedAddress.city}</Typography>
        <Typography variant="body1">{selectedAddress.state}, {selectedAddress.zipCode}</Typography>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)} // Navigate back to address selection
        >
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder} // Trigger order placement
        >
          PLACE ORDER
        </Button>
      </div>

      {/* Success Notification */}
      <Notification
        open={notificationOpen}
        message="Order placed successfully"
        onClose={handleNotificationClose}
      />
    </div>
  );
};

export default OrderConfirmation;



