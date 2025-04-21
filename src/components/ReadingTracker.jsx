import React, { useState, useEffect } from 'react';
import '../styles/ReadingTracker.css';

function ReadingTracker({ book }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(book?.pages || 300);
  const [readingStats, setReadingStats] = useState({
    pagesPerDay: 0,
    percentComplete: 0,
    daysReading: 0
  });

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem(`reading-stats-${book.id}`)) || {
      startDate: new Date(),
      dailyProgress: []
    };
    updateStats(stats);
  }, [currentPage]);

  const updateStats = (stats) => {
    const today = new Date();
    const daysSinceStart = Math.floor((today - new Date(stats.startDate)) / (1000 * 60 * 60 * 24));
    const percentComplete = (currentPage / totalPages) * 100;
    const pagesPerDay = daysSinceStart ? Math.round(currentPage / daysSinceStart) : currentPage;

    setReadingStats({
      pagesPerDay,
      percentComplete: Math.round(percentComplete),
      daysReading: daysSinceStart
    });
  };

  const handleSliderChange = (e) => {
    const newPage = parseInt(e.target.value);
    setCurrentPage(newPage);
    updateLocalStorage(newPage);
  };

  const updateLocalStorage = (page) => {
    const stats = JSON.parse(localStorage.getItem(`reading-stats-${book.id}`)) || {
      startDate: new Date(),
      dailyProgress: []
    };
    stats.dailyProgress.push({
      date: new Date(),
      page: page
    });
    localStorage.setItem(`reading-stats-${book.id}`, JSON.stringify(stats));
  };

  return (
    <div className="reading-tracker">
      <div className="progress-slider">
        <input
          type="range"
          min="0"
          max={totalPages}
          value={currentPage}
          onChange={handleSliderChange}
        />
        <p>Page {currentPage}/{totalPages}</p>
      </div>
      
      <div className="reading-stats">
        <div className="stat-box">
          <h4>Progress</h4>
          <p>{readingStats.percentComplete}%</p>
        </div>
        <div className="stat-box">
          <h4>Pages/Day</h4>
          <p>{readingStats.pagesPerDay}</p>
        </div>
        <div className="stat-box">
          <h4>Days Reading</h4>
          <p>{readingStats.daysReading}</p>
        </div>
      </div>
    </div>
  );
}

export default ReadingTracker;
