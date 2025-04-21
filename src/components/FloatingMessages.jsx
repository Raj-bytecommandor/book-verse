import React, { useState, useEffect } from 'react';
import '../styles/FloatingMessages.css';

const messages = [
  "Welcome to BookVerse",
  "Your journey through the world of books starts here",
  "Discover your next favorite story",
  "Join our community of book lovers",
  "Explore endless literary adventures",
  "Where readers become dreamers"
];

function FloatingMessages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-message-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`floating-message ${index === currentIndex ? 'active' : ''}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
}

export default FloatingMessages;
