import React, { useState } from 'react';
import type { GameConfig } from '../types';
import './SetupScreen.css';

interface SetupScreenProps {
  playerCount: number;
  onStartGame: (config: GameConfig) => void;
  onBack: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  playerCount,
  onStartGame,
  onBack,
}) => {
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState<10 | 20 | 30 | 50>(10);

  const questionOptions: Array<10 | 20 | 30 | 50> = [10, 20, 30, 50];

  const handleStart = () => {
    onStartGame({
      playerCount,
      questionsPerPlayer,
      category: 'animals',
    });
  };

  return (
    <div className="screen setup-screen">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="setup-content">
        <h1 className="setup-title">Game Setup</h1>
        
        <div className="setup-section">
          <p className="setup-label">
            Players: <strong>{playerCount}</strong>
          </p>
        </div>

        <div className="setup-section">
          <p className="setup-label">Category:</p>
          <div className="category-option selected">
            🐾 Animals
          </div>
        </div>

        <div className="setup-section">
          <p className="setup-label">Questions per player:</p>
          <div className="questions-grid">
            {questionOptions.map((count) => (
              <button
                key={count}
                className={`question-button ${
                  questionsPerPlayer === count ? 'selected' : ''
                }`}
                onClick={() => setQuestionsPerPlayer(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button className="start-button" onClick={handleStart}>
          Start Game 🎮
        </button>
      </div>
    </div>
  );
};
