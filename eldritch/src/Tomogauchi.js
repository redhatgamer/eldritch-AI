// src/Tomogauchi.js
import React, { useState, useEffect } from 'react';
import './Tomogauchi.css';

function Tomogauchi() {
  const [happiness, setHappiness] = useState(50);
  const [hunger, setHunger] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness((prev) => Math.max(prev - 1, 0));
      setHunger((prev) => Math.min(prev + 1, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const feed = () => {
    setHunger((prev) => Math.max(prev - 10, 0));
    setHappiness((prev) => Math.min(prev + 5, 100));
  };

  const play = () => {
    setHappiness((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div className="tomogauchi">
      <h2>Tomogauchi</h2>
      <div className="stats">
        <div>Happiness: {happiness}</div>
        <div>Hunger: {hunger}</div>
      </div>
      <div className="buttons">
        <button onClick={feed}>Feed</button>
        <button onClick={play}>Play</button>
      </div>
      <div className="tomogauchi-pet">
        {happiness > 50 ? '😊' : happiness > 20 ? '😐' : '😢'}
      </div>
    </div>
  );
}

export default Tomogauchi;
