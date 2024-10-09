import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import { CircularProgress, Typography, Button } from '@mui/material';
import './ProductDetails.css'; // Import the updated CSS file

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handlePlaceOrder = () => {
    const quantity = document.getElementById('quantity').value; // Get quantity from input
    // Ensure both product and quantity are passed in navigate
    navigate('/address', {
      state: { selectedProduct: product, quantity: parseInt(quantity, 10) } // Pass product and quantity
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <div className="product-header">
          <Typography variant="h2" className="product-name">{product.name}</Typography>
          <Typography variant="h5" className="product-availability">
            Available Quantity: {product.availableItems}
          </Typography>
        </div>
        <Typography variant="h6" className="product-category">
          <strong>Category:</strong> {product.category}
        </Typography>
        <Typography variant="body1" className="product-description">
          {product.description}
        </Typography>
        <Typography variant="h4" className="product-price">
          <span className="price-text">Price: ₹{product.price}</span>
        </Typography>

        <div className="quantity-box">
          <label htmlFor="quantity">Enter Quantity*</label>
          <input type="number" id="quantity" min="1" defaultValue="1" />
        </div>

        <div className="order-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}  // Call the navigate function here
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


