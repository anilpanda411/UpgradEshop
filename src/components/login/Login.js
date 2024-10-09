import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

  const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // API call to log in the user
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      setIsAdmin(data.roles[0] === 'ADMIN');
      
      // Store the authentication token in localStorage
      localStorage.setItem('authToken', data.token);

      // Redirect to the products page
      navigate('/products');  // Corrected path
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px' }}>
      <Box
        sx={{
          width: '350px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50px"
          height="50px"
          borderRadius="50%"
          bgcolor="red"
          margin="auto"
          mb={1}
        >
          <LockIcon style={{ fontSize: 30, color: 'white' }} />
        </Box>

        <Typography variant="h6" gutterBottom>Sign In</Typography>
        {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

        <form onSubmit={handleLogin} style={{ marginTop: '10px' }}>
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="/signup" underline="always" style={{ color: 'blue' }}>
            Don't have an account? Sign Up
          </Link>
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Copyright © upGrad 2021.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;





