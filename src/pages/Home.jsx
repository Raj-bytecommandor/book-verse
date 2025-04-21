import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaNewspaper, FaBookReader, FaStore } from 'react-icons/fa';
import FloatingMessages from '../components/FloatingMessages';
import FloatingPlanets from '../components/FloatingPlanets';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <FloatingPlanets />
      <section className="hero-section">
        <h1>Welcome to BookVerse</h1>
        <p>Your journey through the world of books starts here</p>
        <FloatingMessages />
      </section>

      <div className="features-container">
        <div className="feature-box" onClick={() => navigate('/search')}>
          <FaSearch className="feature-icon" />
          <h2>Search</h2>
          <p>Find your next favorite book</p>
        </div>

        <div className="feature-box" onClick={() => navigate('/articles')}>
          <FaNewspaper className="feature-icon" />
          <h2>News</h2>
          <p>Latest from the book world</p>
        </div>

        <div className="feature-box" onClick={() => navigate('/reading')}>
          <FaBookReader className="feature-icon" />
          <h2>Track</h2>
          <p>Monitor your reading progress</p>
        </div>

        <div className="feature-box" onClick={() => navigate('/marketplace')}>
          <FaStore className="feature-icon" />
          <h2>Shop</h2>
          <p>Buy and sell books</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
