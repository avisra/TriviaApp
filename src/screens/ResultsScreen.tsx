import React, { useEffect } from 'react';
import type { PlayerScore } from '../types';
import './ResultsScreen.css';

interface ResultsScreenProps {
  playerScores: PlayerScore[];
  onPlayAgain: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  playerScores,
  onPlayAgain,
}) => {
  // Sort players by score (descending)
  const sortedScores = [...playerScores].sort((a, b) => b.score - a.score);
  const winner = sortedScores[0];
  const isTie = sortedScores.filter(p => p.score === winner.score).length > 1;

  // Play celebratory sound when results appear
  useEffect(() => {
    // Create a simple celebratory sound using Web Audio API
    const playVictorySound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Play a victory fanfare (do-mi-sol-do)
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        const duration = 0.15;
        
        notes.forEach((frequency, index) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = 'sine';
          
          const startTime = audioContext.currentTime + (index * duration);
          gainNode.gain.setValueAtTime(0.3, startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
        });
      } catch (error) {
        // Silently fail if audio context is not available
        console.log('Audio playback not available');
      }
    };

    playVictorySound();
  }, []);

  return (
    <div className="screen results-screen">
      <div className="results-content">
        <h1 className="results-title">
          {isTie ? '🎉 It\'s a Tie! 🎉' : '🏆 We Have a Winner! 🏆'}
        </h1>

        {!isTie && (
          <div className="winner-announcement" style={{ background: winner.color }}>
            <div className="winner-badge">
              {winner.name}
            </div>
            <p className="winner-score">
              {winner.score} out of {winner.totalQuestions} correct!
            </p>
          </div>
        )}

        {isTie && (
          <div className="tie-announcement">
            <p className="tie-text">
              {sortedScores
                .filter(p => p.score === winner.score)
                .map(p => p.name)
                .join(' & ')}{' '}
              tied with {winner.score} points!
            </p>
          </div>
        )}

        <div className="scoreboard">
          <h2 className="scoreboard-title">Final Scores</h2>
          {sortedScores.map((player, index) => (
            <div
              key={player.playerNumber}
              className={`score-row ${index === 0 && !isTie ? 'winner-row' : ''}`}
              style={{ borderLeft: `6px solid ${player.color}` }}
            >
              <span className="player-name">
                {index === 0 && !isTie && '👑 '}
                {player.name}
              </span>
              <span className="player-final-score">
                {player.score}/{player.totalQuestions}
                <span className="percentage">
                  {' '}
                  ({Math.round((player.score / player.totalQuestions) * 100)}%)
                </span>
              </span>
            </div>
          ))}
        </div>

        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again 🎮
        </button>
      </div>
    </div>
  );
};
