import React from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onSelectPlayers: (count: number) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPlayers }) => {
  const playerOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="screen welcome-screen">
      <div className="welcome-content">
        <h1 className="game-title">🦁 Trivia Time! 🎉</h1>
        <p className="subtitle">How many players?</p>
        
        <div className="player-grid">
          {playerOptions.map((count) => (
            <button
              key={count}
              className="player-button"
              onClick={() => onSelectPlayers(count)}
            >
              <span className="player-count">{count}</span>
              <span className="player-label">
                {count === 1 ? 'Player' : 'Players'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
