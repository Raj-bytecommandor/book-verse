import React, { useState, useEffect } from 'react';
import '../styles/ReadingTimer.css';

function ReadingTimer() {
  const [isReading, setIsReading] = useState(false);
  const [time, setTime] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval;
    if (isReading) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="reading-timer">
      <div className="timer-display">
        <h3>Reading Time</h3>
        <p className="time">{formatTime(time)}</p>
        <button onClick={() => setIsReading(!isReading)}>
          {isReading ? 'Pause' : 'Start Reading'}
        </button>
      </div>
      <div className="notes-section">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes while reading..."
        />
      </div>
    </div>
  );
}

export default ReadingTimer;
