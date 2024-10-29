import React from 'react';
import { TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => (
  <TextField
    variant="outlined"
    placeholder="Search..."
    size="small"
    value={searchTerm}
    onChange={handleSearch}
    sx={{
      padding: 0,
      margin:" 15px 0",
      borderRadius: '20px', // Adjust the value as needed
      backgroundColor: 'white', // Set background color to white
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px', // Adjust the value as needed
        backgroundColor: 'white', // Ensure the input root also has a white background
        boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.2)', // Add inner shadow
        '& fieldset': {
          border: 'none', // Remove the border
        },
      },
      '& .MuiInputBase-input': {
        padding: '8px 14px', // Adjust the padding as needed
      },
    }}
    InputProps={{
      startAdornment: <SearchIcon sx={{ marginRight: '2px' }} />,
    }}
  />
);

export default SearchBar;