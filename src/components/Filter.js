import React from 'react';
import { TextField, Button, MenuItem, Select } from '@mui/material';

const Filter = ({ filters, onFilterChange, onApplyFilters }) => {
  return (
    <div>
      <TextField
        label="Category"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      />
      <TextField
        label="Company"
        value={filters.company}
        onChange={(e) => onFilterChange('company', e.target.value)}
      />
      <TextField
        label="Rating"
        type="number"
        value={filters.rating}
        onChange={(e) => onFilterChange('rating', e.target.value)}
      />
      <TextField
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={(e) => onFilterChange('minPrice', e.target.value)}
      />
      <TextField
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
      />
      <TextField
        label="Availability"
        value={filters.availability}
        onChange={(e) => onFilterChange('availability', e.target.value)}
      />
      <Button onClick={onApplyFilters}>Apply Filters</Button>
    </div>
  );
};

export default Filter;
