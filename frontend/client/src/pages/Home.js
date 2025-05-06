import React from 'react';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="banner">
        <div className="banner-text">
          <h1>Elegance Meets Shopping</h1>
          <p>Discover handpicked collections with timeless charm</p>
        </div>
      </section>

      <section className="intro">
        <h2>Curated Just for You</h2>
        <p>We bring you the finest selections that blend tradition and modern luxury.</p>
      </section>

      <section className="image-gallery">
        <img src="./pic2.jpg" alt="Vintage fashion" />
        <img src="./pic1.jpg" alt="Luxury item" />
        <img src="./pic3.jpg" alt="Elegant accessories" />
      </section>

      <footer className="footer-message">
        <p>Step into the world of timeless fashion and graceful living.</p>
      </footer>
    </div>
  );
};

export default Home;
