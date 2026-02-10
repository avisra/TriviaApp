export interface Question {
  id: string;
  category: string;
  difficulty: 'medium' | 'hard';
  question: string;
  options: string[];
  answerIndex: number;
}

export interface GameConfig {
  playerCount: number;
  questionsPerPlayer: 10 | 20 | 30 | 50;
  category: 'animals';
}

export interface PlayerScore {
  playerNumber: number;
  score: number;
  totalQuestions: number;
}

export interface GameState {
  config: GameConfig | null;
  currentPlayerIndex: number;
  currentQuestionIndex: number;
  playerScores: PlayerScore[];
  playerQuestions: Question[][];
  showTransition: boolean;
  gameComplete: boolean;
}

export type Screen = 'welcome' | 'setup' | 'game' | 'results';
