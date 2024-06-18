import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../api';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(response => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {product.company}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.availability ? 'In Stock' : 'Out of Stock'}
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;
