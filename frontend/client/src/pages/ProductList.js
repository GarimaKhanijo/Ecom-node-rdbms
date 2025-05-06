import React, { useEffect, useState } from 'react';
import API from '../api'; // Assuming you have an API utility for making requests
import './styles/ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);  // State for storing products
  const [categories, setCategories] = useState([]);  // State for storing categories
  const [showCategories, setShowCategories] = useState(false);  // To toggle the visibility of category menu
  const [activeCategory, setActiveCategory] = useState(null);  // State to track the selected category

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/api/categories');
        setCategories(res.data.categories || []);  // Set categories state with data
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products, optionally by category
  const fetchProducts = async (categoryId = null) => {
    try {
      const endpoint = categoryId? `/api/products/products/id?categoryId=${categoryId}`: '/api/products';  // Otherwise, fetch all products

      const res = await API.get(endpoint);
      setProducts(res.data.products || []);  // Set products state with the filtered data
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Initially load all products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle category selection and fetch filtered products
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);  // Set the selected category
    fetchProducts(categoryId);  // Fetch products by selected category
    setShowCategories(false);  // Hide category panel after selection
  };

  return (
    <div className="product-list-wrapper">
      {/* Top-left menu icon to toggle categories */}
      <div className="menu-icon" onClick={() => setShowCategories(!showCategories)}>
        Categories
      </div>

      {/* Categories panel */}
      {showCategories && (
        <div className="category-panel">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Displaying products */}
      <div className="product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
