import React, { useState } from 'react';
import { FaShoppingCart, FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { useMarketplace } from '../../context/MarketplaceContext';
import SellBookForm from './SellBookForm';
import './Marketplace.css';

function Marketplace() {
  const { listedBooks, cart, addToCart } = useMarketplace();
  const [showSellForm, setShowSellForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = listedBooks.filter(book => {
    const matchesFilter = filter === 'all' || book.type === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h1>Book Marketplace</h1>
        <div className="header-actions">
          <button className="sell-button" onClick={() => setShowSellForm(true)}>
            <FaPlus /> List a Book
          </button>
          <div className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </div>

      <div className="marketplace-filters">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Books</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="rare">Rare Finds</option>
        </select>
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="market-book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="condition">Condition: {book.condition}</p>
              <div className="price-row">
                <span className="price">${book.price}</span>
                <button 
                  className="buy-button"
                  onClick={() => addToCart(book)}
                  disabled={cart.some(item => item.id === book.id)}
                >
                  {cart.some(item => item.id === book.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
              <p className="seller">Seller: {book.seller}</p>
              <p className="location">Location: {book.location}</p>
            </div>
          </div>
        ))}
      </div>

      {showSellForm && (
        <SellBookForm onClose={() => setShowSellForm(false)} />
      )}
    </div>
  );
}

export default Marketplace;
