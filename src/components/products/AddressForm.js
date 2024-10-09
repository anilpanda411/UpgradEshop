import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, Typography, Stepper, Step, StepLabel, Snackbar, Alert } from '@mui/material';
import './AddressOrderForm.css'; 

const steps = ['Items', 'Select Address', 'Confirm Order'];

const AddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedProduct, quantity } = location.state || {};

  const [address, setAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [savedAddresses, setSavedAddresses] = useState([]);  
  const [selectedAddress, setSelectedAddress] = useState(null);  // Now it's an object
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSaveAddress = () => {
    if (Object.values(address).some(value => !value)) {
      setError(true);  
      return;
    }
    setSavedAddresses([...savedAddresses, address]); 
    setAddress({ name: '', contactNumber: '', street: '', city: '', state: '', zipCode: '' }); 
    setError(false);
  };

  const handleNext = () => {
    if (!selectedAddress) {
      setError(true);  
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
    navigate('/order-confirmation', {
      state: { selectedProduct, quantity, selectedAddress },
    });
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div className="address-form-container">
      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Stepper 
          activeStep={activeStep} 
          style={{ fontSize: '1.5rem', padding: '10px 0' }}  
          className="custom-stepper"
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  style: { fontSize: '2rem' }  
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <Typography variant="h4" gutterBottom>
        Add Address
      </Typography>

      <TextField
        select
        label="Select Address"
        value={selectedAddress ? selectedAddress.name : ''}
        onChange={(e) => setSelectedAddress(savedAddresses.find(addr => addr.name === e.target.value))}
        SelectProps={{ native: true }}
        fullWidth
        margin="normal"
      >
        <option value="">Select...</option>
        {savedAddresses.map((address, index) => (
          <option key={index} value={address.name}>
            {address.name} - {address.street}, {address.city}
          </option>
        ))}
      </TextField>

      <TextField
        label="Name"
        name="name"
        value={address.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={address.contactNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Street"
        name="street"
        value={address.street}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={address.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="State"
        name="state"
        value={address.state}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Zip Code"
        name="zipCode"
        value={address.zipCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Please select address!
        </Alert>
      </Snackbar>

      {/* Save Address button positioned above Next and Back */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          onClick={handleSaveAddress}
          style={{
            fontSize: '1.2rem', 
            padding: '8px 30px',
            height: '30px',      // Set a fixed height
            minWidth: '450px',
          }}
        >
          Save Address
        </Button>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
      <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)} // Go back to the address form page
        >
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;




