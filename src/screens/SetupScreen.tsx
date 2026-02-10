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
  const [categories, setCategories] = useState<('animals' | 'pokemon' | 'prehistoric')[]>(['animals']);

  const questionOptions: Array<10 | 20 | 30 | 50> = [10, 20, 30, 50];

  const toggleCategory = (category: 'animals' | 'pokemon' | 'prehistoric') => {
    if (categories.includes(category)) {
      // Don't allow deselecting if it's the only one selected
      if (categories.length > 1) {
        setCategories(categories.filter(c => c !== category));
      }
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleStart = () => {
    onStartGame({
      playerCount,
      questionsPerPlayer,
      categories,
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
          <p className="setup-label">Categories (select 1 or more):</p>
          <div className="category-grid">
            <button
              className={`category-option ${categories.includes('animals') ? 'selected' : ''}`}
              onClick={() => toggleCategory('animals')}
            >
              🐾 Animals
            </button>
            <button
              className={`category-option ${categories.includes('pokemon') ? 'selected' : ''}`}
              onClick={() => toggleCategory('pokemon')}
            >
              <img src="/ball.png" alt="" className="category-icon" />
              Pokemon
            </button>
            <button
              className={`category-option ${categories.includes('prehistoric') ? 'selected' : ''}`}
              onClick={() => toggleCategory('prehistoric')}
            >
              🦖 Prehistoric
            </button>
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
