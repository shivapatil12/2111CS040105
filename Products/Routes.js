// src/Routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import ProductDetails from './ProductDetails';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
