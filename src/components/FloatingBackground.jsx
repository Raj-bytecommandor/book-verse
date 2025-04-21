import React, { useEffect } from 'react';
import '../styles/FloatingBackground.css';

function FloatingBackground() {
  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector('.floating-background');
      if (!container) return;
      
      // Clear existing stars
      const existingStars = container.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    
    return () => window.removeEventListener('resize', createStars);
  }, []);

  return (
    <div className="floating-background">
      <div className="floating-effect effect-1"></div>
      <div className="floating-effect effect-2"></div>
    </div>
  );
}

export default FloatingBackground;
