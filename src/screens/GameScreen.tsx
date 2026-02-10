import React, { useState, useEffect } from 'react';
import type { Question, PlayerScore } from '../types';
import './GameScreen.css';

interface GameScreenProps {
  currentPlayer: number;
  currentQuestion: Question;
  questionNumber: number;
  totalQuestions: number;
  playerScores: PlayerScore[];
  onAnswer: (isCorrect: boolean) => void;
  playerColor: string;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  currentPlayer,
  currentQuestion,
  questionNumber,
  totalQuestions,
  playerScores,
  onAnswer,
  playerColor,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Reset focus when question changes
  useEffect(() => {
    // Remove focus from any active element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentQuestion.id, currentPlayer]);

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

  const currentPlayerScore = playerScores[currentPlayer];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="screen game-screen" style={{ background: playerColor }}>
      <div className="game-header">
        <div className="current-player">{currentPlayerScore.name}</div>
        <div className="game-stats">
          <span className="stat-item">
            Score: {currentPlayerScore.score}/{currentPlayerScore.totalQuestions}
          </span>
          <span className="stat-item">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty === 'easy' ? '✨ Easy' : 
             currentQuestion.difficulty === 'medium' ? '⭐ Medium' : '⭐⭐ Hard'}
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
