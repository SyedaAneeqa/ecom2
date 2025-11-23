// src/components/admin/ProductList.js
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductRow from './ProductRow'; // We'll create this next

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all products from your API
      const response = await axios.get('/api/admin/products'); 
      setProducts(response.data.products);
    } catch (err) {
      setError("Failed to fetch products. Check the server API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await axios.delete(`/api/admin/products?id=${productId}`);
      // Remove the deleted product from the local state
      setProducts(products.filter(p => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (err) {
      alert("Failed to delete product.");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;
  if (products.length === 0) return <p className="text-center p-4">No products found. Add one!</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category / Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Retail/Cost)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <ProductRow key={product._id} product={product} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
src/components/admin/ProductList.js
