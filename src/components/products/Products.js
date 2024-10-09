// //*******************chat gpt code */
// import React, { useEffect, useState } from 'react';
// import {
//   Container, Grid, Typography, Card, CardContent, CardMedia, Button,
//   FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('ALL');
//   const [sortOrder, setSortOrder] = useState('default');
//   const [isAdmin, setIsAdmin] = useState(false);  // Admin state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const adminStatus = localStorage.getItem('isAdmin'); // Check if the user is admin
    
//     if (!token) {
//       navigate('/login');  // Redirect if not logged in
//     } else {
//       fetchProducts();
//     }

//     // Check if the user is admin
//     if (adminStatus === 'true') {
//       setIsAdmin(true);  // Admin mode activated
//     }
//   }, [navigate]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Category filtering
//   const handleCategoryChange = (event, newCategory) => {
//     if (newCategory !== null) {
//       setSelectedCategory(newCategory);
//     }
//   };

//   // Sorting by price
//   const sortProductsByPrice = (order) => {
//     setSortOrder(order);
//     let sortedProducts = [...products];

//     if (order === 'lowToHigh') {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (order === 'highToLow') {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     }
//     setProducts(sortedProducts);
//   };

//   // Filter products by selected category
//   const displayedProducts = products.filter((product) => {
//     return selectedCategory === 'ALL' || product.category === selectedCategory;
//   });

//   return (
//     <Container>
//       {/* Category Tabs */}
//       <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
//         <ToggleButtonGroup
//           color="primary"
//           value={selectedCategory}
//           exclusive
//           onChange={handleCategoryChange}
//           aria-label="product categories"
//         >
//           <ToggleButton value="ALL">ALL</ToggleButton>
//           <ToggleButton value="APPAREL">APPAREL</ToggleButton>
//           <ToggleButton value="ELECTRONICS">ELECTRONICS</ToggleButton>
//           <ToggleButton value="FOOTWEAR">FOOTWEAR</ToggleButton>
//           <ToggleButton value="PERSONAL CARE">PERSONAL CARE</ToggleButton>
//         </ToggleButtonGroup>
//       </div>

//       {/* Sort Dropdown and Products Grid */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//         {/* Sort Dropdown */}
//         <div style={{ marginRight: '20px' }}>
//           <FormControl variant="outlined" style={{ minWidth: 200 }}>
//             <InputLabel>Sort by</InputLabel>
//             <Select
//               value={sortOrder}
//               onChange={(e) => sortProductsByPrice(e.target.value)}
//               label="Sort by"
//             >
//               <MenuItem value="default">Default</MenuItem>
//               <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
//               <MenuItem value="highToLow">Price: High to Low</MenuItem>
//               <MenuItem value="newest">Newest</MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         {/* Product Cards Grid */}
//         <Grid container spacing={4} style={{ flexGrow: 1 }}>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}

//           {displayedProducts.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.imageUrl}
//                   alt={product.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5">
//                     {product.name}
//                   </Typography>
//                   <Typography>
//                     {product.description}
//                   </Typography>
//                   <Typography variant="h6">
//                     ₹{product.price}
//                   </Typography>

//                   {/* Admin and User Differentiation */}
//                   {isAdmin ? (
//                     <>
//                       <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
//                         EDIT PRODUCT
//                       </Button>
//                       <Button variant="contained" color="error" style={{ marginTop: '10px', marginLeft: '10px' }}>
//                         DELETE
//                       </Button>
//                     </>
//                   ) : (
//                     <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
//                       BUY
//                     </Button>
//                   )}

//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </Container>
//   );
// };

// export default Products;

//tewnty five
// import React, { useEffect, useState } from 'react';
// import {
//   Container, Grid, Typography, Card, CardContent, CardMedia, Button,
//   FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';  // Import Edit icon
// import DeleteIcon from '@mui/icons-material/Delete';  // Import Delete icon
// import { useNavigate } from 'react-router-dom';

// const Products = ({ isAdmin }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('ALL');
//   const [sortOrder, setSortOrder] = useState('default');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
    
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchProducts();
//     }
//   }, [navigate]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (event, newCategory) => {
//     if (newCategory !== null) {
//       setSelectedCategory(newCategory);
//     }
//   };

//   const sortProductsByPrice = (order) => {
//     setSortOrder(order);
//     let sortedProducts = [...products];

//     if (order === 'lowToHigh') {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (order === 'highToLow') {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     }
//     setProducts(sortedProducts);
//   };

//   const displayedProducts = products.filter((product) => {
//     return selectedCategory === 'ALL' || product.category === selectedCategory;
//   });

//   return (
//     <Container>
//       {/* Category Tabs */}
//       <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
//         <ToggleButtonGroup
//           color="primary"
//           value={selectedCategory}
//           exclusive
//           onChange={handleCategoryChange}
//           aria-label="product categories"
//         >
//           <ToggleButton value="ALL">ALL</ToggleButton>
//           <ToggleButton value="APPAREL">APPAREL</ToggleButton>
//           <ToggleButton value="ELECTRONICS">ELECTRONICS</ToggleButton>
//           <ToggleButton value="FOOTWEAR">FOOTWEAR</ToggleButton>
//           <ToggleButton value="PERSONAL CARE">PERSONAL CARE</ToggleButton>
//         </ToggleButtonGroup>
//       </div>

//       {/* Sort Dropdown and Products Grid */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//         {/* Sort Dropdown */}
//         <div style={{ marginRight: '20px' }}>
//           <FormControl variant="outlined" style={{ minWidth: 200 }}>
//             <InputLabel>Sort by</InputLabel>
//             <Select
//               value={sortOrder}
//               onChange={(e) => sortProductsByPrice(e.target.value)}
//               label="Sort by"
//             >
//               <MenuItem value="default">Default</MenuItem>
//               <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
//               <MenuItem value="highToLow">Price: High to Low</MenuItem>
//               <MenuItem value="newest">Newest</MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         {/* Product Cards Grid */}
//         <Grid container spacing={4} style={{ flexGrow: 1 }}>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}

//           {displayedProducts.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.imageUrl}
//                   alt={product.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5">
//                     {product.name}
//                   </Typography>
//                   <Typography>
//                     {product.description}
//                   </Typography>
//                   <Typography variant="h6">
//                     ₹{product.price}
//                   </Typography>

//                   {/* Conditional Button Rendering for Admin and Users */}
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
//                         BUY
//                       </Button>

//                       {/* Update: Icon for Edit and Delete */}
//                       <div style={{ display: 'flex', gap: '10px' }}>
//                         <EditIcon style={{ color: 'grey', cursor: 'pointer' }} />
//                         <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
//                       </div>
//                     </div>
//                   ) : (
//                     <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
//                       BUY
//                     </Button>
//                   )}

//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </Container>
//   );
// };

// export default Products;

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Grid, Typography, Card, CardContent, CardMedia, Button,
//   FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';  
// import DeleteIcon from '@mui/icons-material/Delete';  
// import { useNavigate } from 'react-router-dom';

// const Products = ({ isAdmin }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState(['ALL']);  // New state for categories
//   const [selectedCategory, setSelectedCategory] = useState('ALL');
//   const [sortOrder, setSortOrder] = useState('default');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
    
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchProducts();
//     }
//   }, [navigate]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);

//       // Extract unique categories from the API response
//       const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
//       setCategories(['ALL', ...uniqueCategories]);  // Add 'ALL' as the default category
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (event, newCategory) => {
//     if (newCategory !== null) {
//       setSelectedCategory(newCategory);
//     }
//   };

//   const sortProductsByPrice = (order) => {
//     setSortOrder(order);
//   };

//   const applySortingAndFiltering = () => {
//     // Filter by category
//     let filteredProducts = products.filter((product) => {
//       return selectedCategory === 'ALL' || product.category === selectedCategory;
//     });

//     // Sort products based on the selected sort order
//     if (sortOrder === 'lowToHigh') {
//       filteredProducts.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === 'highToLow') {
//       filteredProducts.sort((a, b) => b.price - a.price);
//     }

//     return filteredProducts;
//   };

//   const displayedProducts = applySortingAndFiltering();

//   return (
//     <Container>
//       {/* Category Tabs */}
//       <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
//         <ToggleButtonGroup
//           color="primary"
//           value={selectedCategory}
//           exclusive
//           onChange={handleCategoryChange}
//           aria-label="product categories"
//         >
//           {categories.map(category => (
//             <ToggleButton key={category} value={category}>
//               {category.toUpperCase()}
//             </ToggleButton>
//           ))}
//         </ToggleButtonGroup>
//       </div>

//       {/* Sort Dropdown and Products Grid */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//         {/* Sort Dropdown */}
//         <div style={{ marginRight: '20px' }}>
//           <FormControl variant="outlined" style={{ minWidth: 200 }}>
//             <InputLabel>Sort by</InputLabel>
//             <Select
//               value={sortOrder}
//               onChange={(e) => sortProductsByPrice(e.target.value)}
//               label="Sort by"
//             >
//               <MenuItem value="default">Default</MenuItem>
//               <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
//               <MenuItem value="highToLow">Price: High to Low</MenuItem>
//               <MenuItem value="newest">Newest</MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         {/* Product Cards Grid */}
//         <Grid container spacing={4} style={{ flexGrow: 1 }}>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}

//           {displayedProducts.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.imageUrl}
//                   alt={product.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5">
//                     {product.name}
//                   </Typography>
//                   <Typography>
//                     {product.description}
//                   </Typography>
//                   <Typography variant="h6">
//                     ₹{product.price}
//                   </Typography>

//                   {/* Conditional Button Rendering for Admin and Users */}
//                   {isAdmin ? (
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Button 
//                         variant="contained" 
//                         color="primary" 
//                         style={{ marginTop: '10px' }}
//                         onClick={() => navigate(`/products/${product.id}`)}
//                       >
//                         BUY
//                       </Button>
//                       <div style={{ display: 'flex', gap: '10px' }}>
//                         <EditIcon style={{ color: 'grey', cursor: 'pointer' }} />
//                         <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
//                       </div>
//                     </div>
//                   ) : (
//                     <Button 
//                       variant="contained" 
//                       color="primary" 
//                       style={{ marginTop: '10px' }}
//                       onClick={() => navigate(`/products/${product.id}`)}
//                     >
//                       BUY
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </Container>
//   );
// };

// export default Products;

//>>>>>>>>>>>>> 09/10/2024

import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Card, CardContent, CardMedia, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Products = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(['ALL']);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);

      const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
      setCategories(['ALL', ...uniqueCategories]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const sortProductsByPrice = (order) => {
    setSortOrder(order);
  };

  const applySortingAndFiltering = () => {
    let filteredProducts = products.filter((product) => {
      return selectedCategory === 'ALL' || product.category === selectedCategory;
    });

    if (sortOrder === 'lowToHigh') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      alert('Product deleted successfully!');
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Navigate to the edit product page with the product ID
  };

  const displayedProducts = applySortingAndFiltering();

  return (
    <Container>
      <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product categories"
        >
          {categories.map(category => (
            <ToggleButton key={category} value={category}>
              {category.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => sortProductsByPrice(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container spacing={4} style={{ flexGrow: 1 }}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {displayedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.description}
                  </Typography>
                  <Typography variant="h6">
                    ₹{product.price}
                  </Typography>

                  {isAdmin ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ marginTop: '10px' }}
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        BUY
                      </Button>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <EditIcon 
                          style={{ color: 'grey', cursor: 'pointer' }} 
                          onClick={() => handleEdit(product.id)} 
                        />
                        <DeleteIcon 
                          style={{ color: 'grey', cursor: 'pointer' }} 
                          onClick={() => handleDelete(product.id)} 
                        />
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="contained" 
                      color="primary" 
                      style={{ marginTop: '10px' }}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      BUY
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Products;
