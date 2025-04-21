import React, { useState, useEffect } from 'react';
import '../styles/SavedBooks.css';

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setSavedBooks(books);
  }, []);

  const removeBook = (bookId) => {
    const updatedBooks = savedBooks.filter(book => book.id !== bookId);
    setSavedBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };

  return (
    <div className="saved-books-container">
      <h1>Your Saved Books</h1>
      {savedBooks.length === 0 ? (
        <p className="no-books">No saved books yet. Start exploring to save some!</p>
      ) : (
        <div className="saved-books-grid">
          {savedBooks.map(book => (
            <div key={book.id} className="saved-book-card">
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button onClick={() => removeBook(book.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedBooks;
