import React from 'react';

const BookCard = React.memo(({ book }) => {
  return (
    <div className="book-card">
      <img 
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={book.title}
        onError={(e) => {
          e.target.src = '/placeholder.jpg';
        }}
      />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>By {book.author_name?.[0] || 'Unknown Author'}</p>
        <p className="description">
          {book.first_sentence?.[0]?.slice(0, 150) || 'No description available'}...
        </p>
        <div className="book-actions">
          <a 
            href={`https://openlibrary.org${book.key}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-button"
          >
            View Details
          </a>
          <button className="save-button">Save for Later</button>
        </div>
      </div>
    </div>
  );
});

export default BookCard;
