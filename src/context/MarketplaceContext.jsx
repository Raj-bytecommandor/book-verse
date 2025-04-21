import React, { createContext, useState, useContext } from 'react';

const MarketplaceContext = createContext();

export function MarketplaceProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [listedBooks, setListedBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 15.99,
      condition: "Good",
      seller: "John Doe",
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      location: "New York",
      type: "used"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: 12.99,
      condition: "Like New",
      seller: "Jane Smith",
      image: "https://covers.openlibrary.org/b/id/7222248-L.jpg",
      location: "London",
      type: "used"
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 18.50,
      condition: "New",
      seller: "BookStore NY",
      image: "https://covers.openlibrary.org/b/id/7890123-L.jpg",
      location: "Chicago",
      type: "new"
    },
    {
      id: 4,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 45.99,
      condition: "Collectible",
      seller: "Rare Books Co",
      image: "https://covers.openlibrary.org/b/id/7123456-L.jpg",
      location: "San Francisco",
      type: "rare"
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      condition: "Good",
      seller: "Classic Reads",
      image: "https://covers.openlibrary.org/b/id/7456789-L.jpg",
      location: "Boston",
      type: "used"
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 14.99,
      condition: "Like New",
      seller: "Modern Library",
      image: "https://covers.openlibrary.org/b/id/7345678-L.jpg",
      location: "Seattle",
      type: "used"
    },
    {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      price: 24.99,
      condition: "New",
      seller: "SciFi Books",
      image: "https://covers.openlibrary.org/b/id/7234567-L.jpg",
      location: "Austin",
      type: "new"
    },
    {
      id: 8,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 89.99,
      condition: "First Edition",
      seller: "Rare Collections",
      image: "https://covers.openlibrary.org/b/id/7567890-L.jpg",
      location: "Portland",
      type: "rare"
    },
    {
      id: 9,
      title: "Brave New World",
      author: "Aldous Huxley",
      price: 16.99,
      condition: "Good",
      seller: "Dystopian Reads",
      image: "https://covers.openlibrary.org/b/id/7678901-L.jpg",
      location: "Miami",
      type: "used"
    },
    {
      id: 10,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 11.99,
      condition: "Like New",
      seller: "World Literature",
      image: "https://covers.openlibrary.org/b/id/7789012-L.jpg",
      location: "Denver",
      type: "used"
    },
    {
      id: 11,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: 22.99,
      condition: "New",
      seller: "Cosmic Books",
      image: "https://covers.openlibrary.org/b/id/10389354-L.jpg",
      location: "Houston",
      type: "new"
    },
    {
      id: 12,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 16.99,
      condition: "Like New",
      seller: "Thriller Books",
      image: "https://covers.openlibrary.org/b/id/10270034-L.jpg",
      location: "Phoenix",
      type: "used"
    },
    {
      id: 13,
      title: "The Complete Shakespeare",
      author: "William Shakespeare",
      price: 299.99,
      condition: "Antique",
      seller: "Heritage Books",
      image: "https://covers.openlibrary.org/b/id/12345678-L.jpg",
      location: "London",
      type: "rare"
    },
    {
      id: 14,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 19.99,
      condition: "New",
      seller: "Nature Books",
      image: "https://covers.openlibrary.org/b/id/12589741-L.jpg",
      location: "Charleston",
      type: "new"
    },
    {
      id: 15,
      title: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      price: 150.00,
      condition: "Vintage",
      seller: "European Classics",
      image: "https://covers.openlibrary.org/b/id/8746321-L.jpg",
      location: "Paris",
      type: "rare"
    }
  ]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const addNewListing = (book) => {
    setListedBooks([...listedBooks, { ...book, id: Date.now() }]);
  };

  return (
    <MarketplaceContext.Provider value={{
      cart,
      listedBooks,
      addToCart,
      removeFromCart,
      addNewListing
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export const useMarketplace = () => useContext(MarketplaceContext);
