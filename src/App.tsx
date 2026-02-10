import { useState } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SetupScreen } from './screens/SetupScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { generatePlayerQuestions } from './hooks/useGameLogic';
import type { GameConfig, GameState, Screen } from './types';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [playerCount, setPlayerCount] = useState<number>(1);
  
  const [gameState, setGameState] = useState<GameState>({
    config: null,
    currentPlayerIndex: 0,
    currentQuestionIndex: 0,
    playerScores: [],
    playerQuestions: [],
    showTransition: false,
    gameComplete: false,
  });

  const handleSelectPlayers = (count: number) => {
    setPlayerCount(count);
    setCurrentScreen('setup');
  };

  const handleStartGame = (config: GameConfig) => {
    const playerQuestions = generatePlayerQuestions(config);
    
    const playerScores = Array.from({ length: config.playerCount }, (_, i) => ({
      playerNumber: i + 1,
      score: 0,
      totalQuestions: config.questionsPerPlayer,
    }));

    setGameState({
      config,
      currentPlayerIndex: 0,
      currentQuestionIndex: 0,
      playerScores,
      playerQuestions,
      showTransition: true,
      gameComplete: false,
    });

    setCurrentScreen('game');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!gameState.config) return;

    // Update score
    const updatedScores = [...gameState.playerScores];
    if (isCorrect) {
      updatedScores[gameState.currentPlayerIndex].score++;
    }

    const nextQuestionIndex = gameState.currentQuestionIndex + 1;

    // Check if current player finished their questions
    if (nextQuestionIndex >= gameState.config.questionsPerPlayer) {
      const nextPlayerIndex = gameState.currentPlayerIndex + 1;

      // Check if all players finished
      if (nextPlayerIndex >= gameState.config.playerCount) {
        setGameState({
          ...gameState,
          playerScores: updatedScores,
          gameComplete: true,
        });
        setCurrentScreen('results');
      } else {
        // Move to next player
        setGameState({
          ...gameState,
          currentPlayerIndex: nextPlayerIndex,
          currentQuestionIndex: 0,
          playerScores: updatedScores,
          showTransition: true,
        });
      }
    } else {
      // Next question for same player
      setGameState({
        ...gameState,
        currentQuestionIndex: nextQuestionIndex,
        playerScores: updatedScores,
      });
    }
  };

  const handleTransitionComplete = () => {
    setGameState({
      ...gameState,
      showTransition: false,
    });
  };

  const handlePlayAgain = () => {
    setGameState({
      config: null,
      currentPlayerIndex: 0,
      currentQuestionIndex: 0,
      playerScores: [],
      playerQuestions: [],
      showTransition: false,
      gameComplete: false,
    });
    setCurrentScreen('welcome');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="app">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onSelectPlayers={handleSelectPlayers} />
      )}
      
      {currentScreen === 'setup' && (
        <SetupScreen
          playerCount={playerCount}
          onStartGame={handleStartGame}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'game' && gameState.config && (
        <GameScreen
          currentPlayer={gameState.currentPlayerIndex}
          currentQuestion={
            gameState.playerQuestions[gameState.currentPlayerIndex][
              gameState.currentQuestionIndex
            ]
          }
          questionNumber={gameState.currentQuestionIndex + 1}
          totalQuestions={gameState.config.questionsPerPlayer}
          playerScores={gameState.playerScores}
          onAnswer={handleAnswer}
          showTransition={gameState.showTransition}
          onTransitionComplete={handleTransitionComplete}
        />
      )}
      
      {currentScreen === 'results' && (
        <ResultsScreen
          playerScores={gameState.playerScores}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
