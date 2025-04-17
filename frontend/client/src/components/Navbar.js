// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Import CSS

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav className="custom-navbar">
//       <div className="nav-content">
//         <Link to="/">Home</Link>
//         {user ? (
//           <>
//             <Link to="/profile">Profile</Link>
//             {user.role === 'admin' && <Link to="/admin">Admin</Link>}
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-content">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link> {/* 👈 New link added here */}
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

