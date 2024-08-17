// src/AllProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, MenuItem, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "House", "Keyboard", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const COMPANIES = ["AU", "FLP", "SP", "H/N", "AZO"];

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', company: '', minPrice: '', maxPrice: '', rating: '' });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        const { category, company, minPrice, maxPrice, rating } = filters;
        const apiUrl = `http://20.244.56.144/test/companies/${company}/categories/${category}/products/top-n?minPrice=${minPrice}&maxPrice=${maxPrice}`;
        try {
            const response = await axios.get(apiUrl);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>All Products</Typography>
            <div>
                <TextField select label="Category" name="category" onChange={handleFilterChange} fullWidth>
                    {CATEGORIES.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </TextField>
                <TextField select label="Company" name="company" onChange={handleFilterChange} fullWidth>
                    {COMPANIES.map(comp => (
                        <MenuItem key={comp} value={comp}>{comp}</MenuItem>
                    ))}
                </TextField>
                <TextField label="Min Price" type="number" name="minPrice" onChange={handleFilterChange} fullWidth />
                <TextField label="Max Price" type="number" name="maxPrice" onChange={handleFilterChange} fullWidth />
                <TextField label="Rating" type="number" name="rating" onChange={handleFilterChange} fullWidth />
                <Button onClick={fetchProducts} variant="contained" color="primary">Apply Filters</Button>
            </div>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.productName}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://via.placeholder.com/150?text=${product.productName}`}
                                alt={product.productName}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.productName}</Typography>
                                <Typography variant="body2">Price: ${product.price}</Typography>
                                <Typography variant="body2">Rating: {product.rating}</Typography>
                                <Typography variant="body2">Discount: {product.discount}%</Typography>
                                <Typography variant="body2">Availability: {product.availability}</Typography>
                                <Link to={`/product/${product.productName}`}>
                                    <Button variant="contained" color="primary">View Details</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AllProducts;
