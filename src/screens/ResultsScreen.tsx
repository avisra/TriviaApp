import React from 'react';
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

  return (
    <div className="screen results-screen">
      <div className="results-content">
        <h1 className="results-title">
          {isTie ? '🎉 It\'s a Tie! 🎉' : '🏆 We Have a Winner! 🏆'}
        </h1>

        {!isTie && (
          <div className="winner-announcement">
            <div className="winner-badge">
              Player {winner.playerNumber}
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
                .map(p => `Player ${p.playerNumber}`)
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
            >
              <span className="player-name">
                {index === 0 && !isTie && '👑 '}
                Player {player.playerNumber}
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
