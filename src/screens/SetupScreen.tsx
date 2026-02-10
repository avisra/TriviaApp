import React, { useState } from 'react';
import type { GameConfig, Player } from '../types';
import './SetupScreen.css';

interface SetupScreenProps {
  players: Player[];
  onStartGame: (config: GameConfig) => void;
  onBack: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  players,
  onStartGame,
  onBack,
}) => {
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState<10 | 20 | 30 | 50>(10);
  const [categories, setCategories] = useState<('animals' | 'pokemon' | 'prehistoric' | 'comics')[]>(['animals']);
  const [scaleByAge, setScaleByAge] = useState<boolean>(false);

  const questionOptions: Array<10 | 20 | 30 | 50> = [10, 20, 30, 50];

  const toggleCategory = (category: 'animals' | 'pokemon' | 'prehistoric' | 'comics') => {
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
      players,
      questionsPerPlayer,
      categories,
      scaleByAge,
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
          <p className="setup-label">Players:</p>
          <div className="player-list">
            {players.map((player) => (
              <div key={player.playerNumber} className="player-chip" style={{ background: player.color }}>
                <span className="player-chip-name">{player.name}</span>
                <span className="player-chip-age">Age {player.age}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <label className="toggle-container">
            <input
              type="checkbox"
              checked={scaleByAge}
              onChange={(e) => setScaleByAge(e.target.checked)}
              className="toggle-checkbox"
            />
            <span className="toggle-label">⚖️ Scale difficulty by age</span>
            <span className="toggle-description">
              Younger players get more easy questions
            </span>
          </label>
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
            <button
              className={`category-option ${categories.includes('comics') ? 'selected' : ''}`}
              onClick={() => toggleCategory('comics')}
            >
              🦸 Comics
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
