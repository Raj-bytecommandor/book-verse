import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaClock, FaExternalLinkAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { fetchBookNews } from '../services/newsApi';
import '../styles/Articles.css';

function Articles() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    const articles = await fetchBookNews();
    setNews(articles);
    setLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = '/book-news-default.jpg';
  };

  const getCategory = (title, description) => {
    const text = (title + description).toLowerCase();
    if (text.includes('review')) return 'Review';
    if (text.includes('release')) return 'New Release';
    return 'News';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    fetchNews();
    // Auto-update every 5 minutes
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="articles-container">
      <div className="articles-header">
        <FaNewspaper className="header-icon" />
        <h1>Latest Book News & Articles</h1>
        <p className="update-text">
          <FaClock /> Auto-updates every 5 minutes
        </p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading latest news...</div>
      ) : (
        <div className="articles-grid">
          {news.map(article => (
            <div key={article.url} className="article-card">
              <img 
                src={article.urlToImage}
                alt={article.title}
                className="article-image"
                onError={handleImageError}
                loading="lazy"
              />
              <div className="article-content">
                <span className="article-category">
                  {getCategory(article.title, article.description)}
                </span>
                <h2>{article.title}</h2>
                <div className="article-meta">
                  <span><FaCalendarAlt /> {formatDate(article.publishedAt)}</span>
                  {article.author && (
                    <span><FaUser /> {article.author}</span>
                  )}
                </div>
                <p className="article-description">
                  {article.description?.slice(0, 150)}...
                </p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more-link"
                >
                  Read Full Article <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
