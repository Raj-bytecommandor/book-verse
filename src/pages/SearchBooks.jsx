import React, { useState, useEffect } from 'react';
import { searchBooks, getBookDetails } from '../services/bookApi';
import '../styles/SearchBooks.css';

function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    author: '',
    title: '',
    publisher: '',
    subject: '',
    isbn: ''
  });
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    'All',
    'Fiction',
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Biography',
    'History',
    'Poetry',
    'Self Help'
  ];

  const filterBooksByGenre = (books) => {
    if (selectedGenre === 'all') return books;
    return books.filter(book => 
      book.categories?.some(category => 
        category.toLowerCase().includes(selectedGenre.toLowerCase())
      )
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true);
      const results = await searchBooks(searchTerm, filters);
      setBooks(results);
      setLoading(false);
    }
  };

  const handleViewDetails = async (book) => {
    setModalLoading(true);
    setSelectedBook(book);
    try {
      const details = await getBookDetails(book.key.split('/')[2]);
      setBookDetails(details);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedBook(null);
  };

  const renderBookCard = (book) => (
    <div key={book.id} className="book-card" data-aos="fade-up">
      <div className="book-card-inner">
        <div className="book-cover">
          <img 
            src={book.imageLinks?.thumbnail || '/placeholder.jpg'}
            alt={book.title}
            onError={(e) => {e.target.src = '/placeholder.jpg'}}
          />
          <div className="book-hover-info">
            <button 
              className="view-details-btn"
              onClick={() => handleViewDetails(book)}
            >
              View Details
            </button>
          </div>
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-authors">{book.authors.join(', ')}</p>
          {book.description && (
            <p className="book-description">
              {book.description.slice(0, 150)}...
            </p>
          )}
          <div className="book-meta">
            {book.publishedDate && (
              <span className="publish-year">
                {new Date(book.publishedDate).getFullYear()}
              </span>
            )}
            {book.averageRating && (
              <div className="rating-badge">
                <span className="stars">{'★'.repeat(Math.round(book.averageRating))}</span>
                <span className="rating-number">{book.averageRating.toFixed(1)}</span>
              </div>
            )}
            {book.categories?.[0] && (
              <span className="category-tag">{book.categories[0]}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Find Your Next Book</h1>
        <p>Search through millions of books in our collection</p>
      </div>

      <div className="genre-filters">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-tag ${selectedGenre === genre.toLowerCase() ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre.toLowerCase())}
          >
            {genre}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-filters">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books..."
            className="search-input"
          />
          <input
            type="text"
            value={filters.author}
            onChange={(e) => setFilters({...filters, author: e.target.value})}
            placeholder="Author..."
            className="filter-input"
          />
          <input
            type="text"
            value={filters.subject}
            onChange={(e) => setFilters({...filters, subject: e.target.value})}
            placeholder="Subject/Genre..."
            className="filter-input"
          />
          <input
            type="text"
            value={filters.isbn}
            onChange={(e) => setFilters({...filters, isbn: e.target.value})}
            placeholder="ISBN..."
            className="filter-input"
          />
          <button type="submit" className="search-button">Search</button>
        </div>
      </form>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Discovering books for you...</p>
        </div>
      ) : (
        <div className="search-results">
          {books.length > 0 ? (
            <>
              <div className="results-summary">
                <p>Found {filterBooksByGenre(books).length} books</p>
              </div>
              <div className="books-grid">
                {filterBooksByGenre(books).map(renderBookCard)}
              </div>
            </>
          ) : searchTerm && (
            <div className="no-results">
              <div className="no-results-icon">📚</div>
              <p>No books found. Try different search terms.</p>
              <p className="suggestion">Try searching by author, title, or ISBN</p>
            </div>
          )}
        </div>
      )}

      {selectedBook && (
        <div className="book-details-modal" onClick={closeDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeDetails}>&times;</button>
            <div className="modal-grid">
              <div className="modal-image">
                <img 
                  src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                  alt={selectedBook.title}
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
              </div>
              <div className="modal-info">
                {modalLoading ? (
                  <div className="modal-loading">Loading book details...</div>
                ) : (
                  <>
                    <h2>{selectedBook.title}</h2>
                    <p className="author">By {selectedBook.author_name?.[0] || 'Unknown Author'}</p>
                    <p className="publish-info">
                      First published: {selectedBook.first_publish_year || 'Unknown'}
                    </p>
                    <div className="book-metadata">
                      {bookDetails?.subjects && (
                        <div className="subjects">
                          <h3>Subjects:</h3>
                          <p>{bookDetails.subjects.slice(0, 5).join(', ')}</p>
                        </div>
                      )}
                      {selectedBook.language && (
                        <p className="language">Language: {selectedBook.language}</p>
                      )}
                    </div>
                    <p className="description">
                      {bookDetails?.description?.value || 
                       bookDetails?.description || 
                       selectedBook.first_sentence?.[0] || 
                       'No description available.'}
                    </p>
                    <div className="modal-actions">
                      <a 
                        href={`https://openlibrary.org${selectedBook.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-more-link"
                      >
                        Read More on Open Library
                      </a>
                      <button className="save-book">Save for Later</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBooks;
