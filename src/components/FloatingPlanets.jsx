import React from 'react';
import '../styles/FloatingPlanets.css';

function FloatingPlanets() {
  return (
    <div className="floating-planets">
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      <div className="comet"></div>
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}></div>
        ))}
      </div>
    </div>
  );
}

export default FloatingPlanets;
