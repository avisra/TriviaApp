import React, { useState } from 'react';
import type { Question, PlayerScore } from '../types';
import './GameScreen.css';

interface GameScreenProps {
  currentPlayer: number;
  currentQuestion: Question;
  questionNumber: number;
  totalQuestions: number;
  playerScores: PlayerScore[];
  onAnswer: (isCorrect: boolean) => void;
  showTransition: boolean;
  onTransitionComplete: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  currentPlayer,
  currentQuestion,
  questionNumber,
  totalQuestions,
  playerScores,
  onAnswer,
  showTransition,
  onTransitionComplete,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    const correct = index === currentQuestion.answerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Wait for animation, then move to next question
    setTimeout(() => {
      onAnswer(correct);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };

  if (showTransition) {
    return (
      <div className="screen transition-screen">
        <div className="transition-content">
          <h1 className="player-announce">
            Player {currentPlayer + 1}
          </h1>
          <p className="transition-subtitle">Get Ready!</p>
          <button className="ready-button" onClick={onTransitionComplete}>
            I'm Ready! 👍
          </button>
        </div>
      </div>
    );
  }

  const currentPlayerScore = playerScores[currentPlayer];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <div className="current-player">Player {currentPlayer + 1}</div>
        <div className="game-stats">
          <span className="stat-item">
            Score: {currentPlayerScore.score}/{currentPlayerScore.totalQuestions}
          </span>
          <span className="stat-item">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty === 'medium' ? '⭐ Medium' : '⭐⭐ Hard'}
          </span>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="answers-grid">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'answer-button';
            
            if (showFeedback && selectedAnswer === index) {
              buttonClass += isCorrect ? ' correct' : ' incorrect';
            } else if (showFeedback && index === currentQuestion.answerIndex) {
              buttonClass += ' correct-reveal';
            } else if (selectedAnswer !== null) {
              buttonClass += ' disabled';
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="answer-letter">{letters[index]}</span>
                <span className="answer-text">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <div className={`feedback-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '🎉 Correct!' : '❌ Oops! Try next time!'}
        </div>
      )}
    </div>
  );
};
