import React, { useState, useEffect } from 'react';
import '../styles/ReadingGoals.css';

function ReadingGoals() {
  const [goals, setGoals] = useState({
    booksPerMonth: 4,
    pagesPerDay: 50,
    currentProgress: {
      booksRead: 0,
      pagesRead: 0
    }
  });

  const achievements = [
    { id: 1, name: "Bookworm", description: "Read 5 books", unlocked: false },
    { id: 2, name: "Speed Reader", description: "Read 100 pages in a day", unlocked: false },
    { id: 3, name: "Genre Explorer", description: "Read books from 5 different genres", unlocked: false }
  ];

  return (
    <div className="reading-goals">
      <div className="goals-section">
        <h3>Monthly Goals</h3>
        <div className="goal-item">
          <p>Books Goal: {goals.booksRead}/{goals.booksPerMonth}</p>
          <progress value={goals.booksRead} max={goals.booksPerMonth} />
        </div>
      </div>
      
      <div className="achievements-section">
        <h3>Achievements</h3>
        {achievements.map(achievement => (
          <div key={achievement.id} className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}>
            <h4>{achievement.name}</h4>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadingGoals;
