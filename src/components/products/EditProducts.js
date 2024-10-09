import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import './EditProduct.css';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODA1NTYxNiwiZXhwIjoxNzI4MDY0MDE2fQ.oU_svzONjD4uTMlLyHc8uRBOZEDd1WriuonUqrr-LqVCPYLI7IOVSXO1ICJ5aojwAzM43EqcCr-zMVoBpvFZRQ';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    manufacturer: '',
    availableItems: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching product');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      const data = await response.json();
      console.log('Product updated:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Modify Product
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Category"
        name="category"
        value={product.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={product.manufacturer}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Available Items"
        name="availableItems"
        value={product.availableItems}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Price"
        name="price"
        value={product.price}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Image URL"
        name="imageUrl"
        value={product.imageUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Product Description"
        name="description"
        value={product.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: '20px', padding: '10px 0' }}
      >
        MODIFY PRODUCT
      </Button>
    </div>
  );
};

export default EditProduct;
