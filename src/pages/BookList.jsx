import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchBooks } from '../services/bookApi';
import BookCard from '../components/BookCard';
import '../styles/BookList.css';

function BookList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    const results = await searchBooks(searchTerm);
    setBooks(results);
    setHasMore(results.length === 10);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const moreBooks = await searchBooks(searchTerm, nextPage);
    setBooks(prevBooks => [...prevBooks, ...moreBooks]);
    setHasMore(moreBooks.length === 10);
    setPage(nextPage);
  };

  return (
    <div className="book-list-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <InfiniteScroll
          dataLength={books.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="loading">Loading...</div>}
        >
          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default BookList;
