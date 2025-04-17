import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminDashBoard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchAll = async () => {
      const res = await API.get('/api/products');
      setProducts(res.data);
    };
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/api/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await API.post('/api/products', newProduct);
    setProducts([...products, res.data]);
    setNewProduct({ name: '', price: '' });
  };

  return (
    <div className="center-container">
      <h2>Admin Dashboard</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <hr />

      {/* Product List */}
      {products.map(product => (
        <div key={product._id}>
          <p><strong>{product.name}</strong> - ₹{product.price}</p>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
          {/* Future Section: View buyers */}
        </div>
      ))}
    </div>
  );
};

export default AdminDashBoard;
