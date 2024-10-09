import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import './AddProduct.css';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Product Saved:", product);
    // Implement save functionality here
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
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
        select
        label="Category"
        name="category"
        value={product.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        disabled={loading}
      >
        {loading ? (
          <MenuItem value="">
            <em>Loading...</em>
          </MenuItem>
        ) : error ? (
          <MenuItem value="">
            <em>Error loading categories</em>
          </MenuItem>
        ) : (
          categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))
        )}
      </TextField>

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
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: '20px', padding: '10px 0' }}
      >
        SAVE PRODUCT
      </Button>
    </div>
  );
};

export default AddProductForm;

