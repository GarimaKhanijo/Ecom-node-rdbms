import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import './styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/api/users/profile');
        setUser(res.data);

        if (res.data) {
          // Fetch products specific to the logged-in user
          const prodRes = await API.get('/api/products/my');
          setMyProducts(prodRes.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/api/products/${id}`);
        setMyProducts(myProducts.filter((p) => p.id !== id));  // Remove from UI
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="initials">{user.name?.charAt(0).toUpperCase()}</div>
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
        </div>

        {user.role === 'admin' && (
          <div className="admin-actions">
            <Link to="/add-product" className="btn">Add Product</Link>
            <h3>Your Products</h3>
            <div className="product-list">
              {myProducts.length > 0 ? (
                myProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image || "/placeholder.jpg"} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>₹{product.price}</p>
                    <div className="admin-btns">
                      <Link to={`/update-product/${product.id}`} className="btn">Update</Link>
                      <button onClick={() => handleDelete(product.id)} className="btn delete">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
