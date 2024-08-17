// src/ProductDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        // Since the API for fetching a single product is not specified,
        // assume we can fetch all products and find the one by id.
        const apiUrl = `http://20.244.56.144/test/companies/ALL/categories/ALL/products/top-n`;
        try {
            const response = await axios.get(apiUrl);
            const productData = response.data.find(p => p.productName === id);
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{product.productName}</Typography>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={`https://via.placeholder.com/300?text=${product.productName}`}
                    alt={product.productName}
                />
                <CardContent>
                    <Typography variant="h5">Price: ${product.price}</Typography>
                    <Typography variant="h6">Rating: {product.rating}</Typography>
                    <Typography variant="h6">Discount: {product.discount}%</Typography>
                    <Typography variant="h6">Availability: {product.availability}</Typography>
                    <Typography variant="body1">Category: {product.category}</Typography>
                    <Typography variant="body1">Company: {product.company}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductDetails;
