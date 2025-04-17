// import React, { useState } from 'react';
// import API from '../api';
// // import './styles/AddProducts.css';

// const AddProduct = () => {
  
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category: '',
//     image: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     const user = localStorage.getItem('user');
//     const token = user ? JSON.parse(user).token : null;

//     e.preventDefault();
    
//     if (!token) {
//       alert('You must be logged in to add a product.');
//       return;
//     }

//     try {
//         const res = await API.post('/api/products', product, {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             }
//         });

//         console.log(res.data); 
//         alert('Product added successfully!');
//         setProduct({
//           name: '',
//           description: '',
//           price: '',
//           stock: '',
//           category: '',
//           image: ''
//         });
//     } catch (err) {
//       console.error('Failed to add product:', err);
//       alert('Failed to add product');
//     }
//   };

//   return (
//     <div className="add-product-wrapper">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={product.name}
//           onChange={handleChange}
//           required
//         />
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           required
//         />
//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           value={product.price}
//           onChange={handleChange}
//           required
//         />
//         <label>Stock</label>
//         <input
//           type="number"
//           name="stock"
//           value={product.stock}
//           onChange={handleChange}
//           required
//         />
//         <label>Category</label>
//         <input
//           type="text"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//           required
//         />
//         <label>Image URL</label>
//         <input
//           type="text"
//           name="image"
//           value={product.image}
//           onChange={handleChange}
//         />
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;






import React, { useState, useEffect } from 'react';
import API from '../api';
import './styles/AddProducts.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '', // Now it's just a category ID, will be selected from the dropdown
    image: ''
  });

  const [categories, setCategories] = useState([]); // To hold category options

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/api/categories');
        // Check if the response has categories field and map over it
        if (res.data.categories) {
          setCategories(res.data.categories); // Assuming res.data.categories is an array
        } else {
          console.error('Categories are not in expected format');
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        alert('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;

    e.preventDefault();

    if (!token) {
      alert('You must be logged in to add a product.');
      return;
    }

    try {
      const res = await API.post('/api/products', product, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log(res.data);
      alert('Product added successfully!');
      
      // Clear the form fields after successful submission
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
      });

      // Simple redirect to the home page after product is added
      window.location.href = '/';  // Redirects to the home page
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="add-product-wrapper">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
