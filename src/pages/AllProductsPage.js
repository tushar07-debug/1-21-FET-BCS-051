import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(filters, sort, page).then(response => {
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    });
  }, [filters, sort, page]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Category"
            name="category"
            value={filters.category || ''}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Company"
            name="company"
            value={filters.company || ''}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Rating"
            name="rating"
            value={filters.rating || ''}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Price Range"
            name="priceRange"
            value={filters.priceRange || ''}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
              <MenuItem value="rating_desc">Rating (High to Low)</MenuItem>
              <MenuItem value="discount_desc">Discount (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discount: {product.discount}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.availability ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default AllProductsPage;
