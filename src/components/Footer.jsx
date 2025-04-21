import React from 'react';
import { FaBook, FaGithub, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3><FaBook /> BookVerse</h3>
          <p>Your digital sanctuary for all things books</p>
          <div className="social-links">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Made with <FaHeart className="heart-icon" /> by Book Lovers</p>
      </div>
    </footer>
  );
}

export default Footer;
