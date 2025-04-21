import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector('.landing-container');
      if (!container) return;
      
      // Clear existing stars
      const existingStars = container.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.opacity = Math.random();
        container.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    
    return () => window.removeEventListener('resize', createStars);
  }, []);

  return (
    <div className="landing-container">
      <div className="star-overlay"></div>
      <div className="landing-content">
        <h1>Welcome to BookVerse</h1>
        <p>Your journey through the world of books starts here</p>
        <button onClick={() => navigate('/home')} className="enter-button">
          Enter the Library
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
