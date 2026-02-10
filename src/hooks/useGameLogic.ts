import type { Question, GameConfig } from '../types';
import questionsData from '../data/questions.json';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates questions for all players based on game config
 * Questions are shuffled and distributed with proper difficulty mix (70% medium, 30% hard)
 */
export function generatePlayerQuestions(config: GameConfig): Question[][] {
  const allQuestions = questionsData[config.category] as Question[];
  
  // Separate by difficulty
  const mediumQuestions = shuffleArray(
    allQuestions.filter(q => q.difficulty === 'medium')
  );
  const hardQuestions = shuffleArray(
    allQuestions.filter(q => q.difficulty === 'hard')
  );
  
  // Calculate split based on questions per player
  const mediumCount = Math.round(config.questionsPerPlayer * 0.7);
  const hardCount = config.questionsPerPlayer - mediumCount;
  
  const playerQuestions: Question[][] = [];
  
  for (let i = 0; i < config.playerCount; i++) {
    const playerMedium = mediumQuestions.slice(
      i * mediumCount,
      (i + 1) * mediumCount
    );
    const playerHard = hardQuestions.slice(
      i * hardCount,
      (i + 1) * hardCount
    );
    
    // Shuffle the combined questions for this player
    const combinedQuestions = shuffleArray([...playerMedium, ...playerHard]);
    playerQuestions.push(combinedQuestions);
  }
  
  return playerQuestions;
}
