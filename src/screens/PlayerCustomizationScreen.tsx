import React, { useState } from 'react';
import type { Player } from '../types';
import { PLAYER_COLORS } from '../utils/playerColors';
import './PlayerCustomizationScreen.css';

interface PlayerCustomizationScreenProps {
  playerCount: number;
  onComplete: (players: Player[]) => void;
  onBack: () => void;
}

export const PlayerCustomizationScreen: React.FC<PlayerCustomizationScreenProps> = ({
  playerCount,
  onComplete,
  onBack,
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: playerCount }, (_, i) => ({
      playerNumber: i + 1,
      name: `Player ${i + 1}`,
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      age: 10,
    }))
  );

  const currentPlayer = players[currentPlayerIndex];
  const usedColors = players
    .slice(0, currentPlayerIndex)
    .map(p => p.color);

  const handleNameChange = (name: string) => {
    const updated = [...players];
    updated[currentPlayerIndex] = { ...currentPlayer, name };
    setPlayers(updated);
  };

  const handleColorSelect = (color: string) => {
    const updated = [...players];
    updated[currentPlayerIndex] = { ...currentPlayer, color };
    setPlayers(updated);
  };

  const handleAgeChange = (age: string) => {
    const ageNum = parseInt(age) || 6;
    const clamped = Math.max(4, Math.min(99, ageNum));
    const updated = [...players];
    updated[currentPlayerIndex] = { ...currentPlayer, age: clamped };
    setPlayers(updated);
  };

  const handleNext = () => {
    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      onComplete(players);
    }
  };

  const handlePrevious = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    }
  };

  return (
    <div className="screen customization-screen">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="customization-content">
        <h1 className="customization-title">Player Setup</h1>
        <p className="player-progress">
          Player {currentPlayerIndex + 1} of {playerCount}
        </p>

        <div className="customization-form">
          <div className="form-section">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="name-input"
              value={currentPlayer.name}
              onChange={(e) => handleNameChange(e.target.value)}
              maxLength={20}
              placeholder="Enter name"
            />
          </div>

          <div className="form-section">
            <label className="form-label">Choose Your Color:</label>
            <div className="color-grid">
              {PLAYER_COLORS.map((color, index) => {
                const isUsed = usedColors.includes(color);
                const isSelected = currentPlayer.color === color;
                return (
                  <button
                    key={index}
                    className={`color-option ${isSelected ? 'selected' : ''} ${isUsed ? 'used' : ''}`}
                    style={{ background: color }}
                    onClick={() => !isUsed && handleColorSelect(color)}
                    disabled={isUsed}
                    title={isUsed ? 'Already chosen by another player' : ''}
                  >
                    {isSelected && <span className="checkmark">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Age: {currentPlayer.age}</label>
            <input
              type="range"
              className="age-slider"
              value={currentPlayer.age}
              onChange={(e) => handleAgeChange(e.target.value)}
              min={4}
              max={99}
            />
            <div className="age-range-labels">
              <span>4</span>
              <span>99</span>
            </div>
          </div>
        </div>

        <div className="preview-card" style={{ background: currentPlayer.color }}>
          <div className="preview-content">
            <div className="preview-name">{currentPlayer.name}</div>
            <div className="preview-age">Age {currentPlayer.age}</div>
          </div>
        </div>

        <div className="navigation-buttons">
          {currentPlayerIndex > 0 && (
            <button className="nav-button prev-button" onClick={handlePrevious}>
              ← Previous
            </button>
          )}
          <button className="nav-button next-button" onClick={handleNext}>
            {currentPlayerIndex < playerCount - 1 ? 'Next →' : 'Continue to Game Setup'}
          </button>
        </div>
      </div>
    </div>
  );
};
