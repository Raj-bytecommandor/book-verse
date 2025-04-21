import React, { useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import './SellBookForm.css';
import { useMarketplace } from '../../context/MarketplaceContext';

function SellBookForm({ onClose }) {
  const { addNewListing } = useMarketplace();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'good',
    description: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewListing(formData);
    onClose();
  };

  return (
    <div className="sell-form-overlay">
      <div className="sell-form-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>List Your Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title*</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Author*</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Price (USD)*</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="upload-label">
              <FaUpload /> Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <button type="submit" className="submit-button">List Book</button>
        </form>
      </div>
    </div>
  );
}

export default SellBookForm;
