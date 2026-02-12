export interface Question {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Player {
  playerNumber: number;
  name: string;
  color: string;
  age: number;
}

export interface GameConfig {
  players: Player[];
  questionsPerPlayer: 10 | 20 | 30 | 50;
  categories: ('animals' | 'pokemon' | 'prehistoric' | 'comics' | 'disney' | 'mario' | 'starwars' | 'harrypotter' | 'minecraft' | 'dragonballz')[];
  scaleByAge: boolean;
}

export interface PlayerScore {
  playerNumber: number;
  name: string;
  color: string;
  score: number;
  totalQuestions: number;
}

export interface GameState {
  config: GameConfig | null;
  currentPlayerIndex: number;
  currentQuestionIndex: number;
  playerScores: PlayerScore[];
  playerQuestions: Question[][];
  gameComplete: boolean;
}

export type Screen = 'welcome' | 'customization' | 'setup' | 'game' | 'results';
