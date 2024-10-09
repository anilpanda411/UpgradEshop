import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch, resetSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (resetSearch) {
      setQuery(''); // Reset the search bar when necessary
    }
  }, [resetSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Send query back to parent
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', margin: 2 }}>
      <TextField
        label="Search Products"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flexGrow: 1, marginRight: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary">Search</Button>
    </Box>
  );
};

export default SearchBar;
