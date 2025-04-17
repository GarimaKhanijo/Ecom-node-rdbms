import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import './styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Check login status
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please log in to view product details.');
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleBuyNow = () => {
    navigate(`/payment/${product.id}`, { state: { product } });
  };

  if (!product) return <p>Loading...</p>;
return (
  <div className="center-container product-details-container">
    <div className="image-wrapper">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
    </div>
    <h2>{product.name}</h2>
    <p><strong>Category:</strong> {product.category_name}</p>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Price:</strong> ₹{product.price}</p>
    <p><strong>Stock:</strong> {product.stock}</p>
    <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
  </div>
);
};

export default ProductDetails;

