const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Product 1",
    company: "Company A",
    category: "Electronics",
    price: 100,
    rating: 4.5,
    discount: 10,
    availability: true,
    image: "https://via.placeholder.com/300"
  },
];

app.get('/api/products', (req, res) => {
  const { category, company, rating, minPrice, maxPrice, availability, sort, page } = req.query;

  // Filtering logic
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  if (company) {
    filteredProducts = filteredProducts.filter(product => product.company === company);
  }
  if (rating) {
    filteredProducts = filteredProducts.filter(product => product.rating >= parseFloat(rating));
  }
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }
  if (availability !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.availability === (availability === 'true'));
  }

  // Sorting logic
  if (sort) {
    const [sortField, sortOrder] = sort.split('_');
    filteredProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] - b[sortField];
      } else {
        return b[sortField] - a[sortField];
      }
    });
  }

  const itemsPerPage = 10;
  const currentPage = parseInt(page) || 1;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  res.json({
    products: paginatedProducts,
    currentPage,
    totalPages
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
