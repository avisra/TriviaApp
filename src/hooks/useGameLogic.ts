import type { Question, GameConfig } from '../types';
import animalsData from '../data/animals.json';
import pokemonData from '../data/pokemon.json';
import prehistoricData from '../data/prehistoric.json';
import comicsData from '../data/comics.json';

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
 * Calculate difficulty distribution based on player's age
 * Returns [easyPercent, mediumPercent, hardPercent]
 */
function getDifficultyDistributionByAge(age: number): [number, number, number] {
  if (age <= 6) {
    // Very young: 70% easy, 25% medium, 5% hard
    return [0.70, 0.25, 0.05];
  } else if (age <= 8) {
    // Young: 50% easy, 35% medium, 15% hard
    return [0.50, 0.35, 0.15];
  } else if (age <= 10) {
    // Default kids: 40% easy, 40% medium, 20% hard
    return [0.40, 0.40, 0.20];
  } else if (age <= 12) {
    // Older kids: 25% easy, 50% medium, 25% hard
    return [0.25, 0.50, 0.25];
  } else if (age <= 15) {
    // Teens: 10% easy, 50% medium, 40% hard
    return [0.10, 0.50, 0.40];
  } else {
    // Adults: 0% easy, 40% medium, 60% hard
    return [0.0, 0.40, 0.60];
  }
}

/**
 * Get questions for a specific category
 */
function getQuestionsByCategory(category: 'animals' | 'pokemon' | 'prehistoric' | 'comics'): Question[] {
  switch (category) {
    case 'animals':
      return animalsData as Question[];
    case 'pokemon':
      return pokemonData as Question[];
    case 'prehistoric':
      return prehistoricData as Question[];
    case 'comics':
      return comicsData as Question[];
    default:
      return animalsData as Question[];
  }
}

/**
 * Get questions from multiple categories combined
 */
function getQuestionsByCategories(categories: GameConfig['categories']): Question[] {
  const allQuestions: Question[] = [];
  
  for (const category of categories) {
    allQuestions.push(...getQuestionsByCategory(category));
  }
  
  return allQuestions;
}

/**
 * Generates questions for all players based on game config
 * Questions are shuffled and distributed with difficulty mix based on age (if enabled) or default (40% easy, 40% medium, 20% hard)
 */
export function generatePlayerQuestions(config: GameConfig): Question[][] {
  const allQuestions = getQuestionsByCategories(config.categories);
  
  // Separate by difficulty
  const easyQuestions = shuffleArray(
    allQuestions.filter(q => q.difficulty === 'easy')
  );
  const mediumQuestions = shuffleArray(
    allQuestions.filter(q => q.difficulty === 'medium')
  );
  const hardQuestions = shuffleArray(
    allQuestions.filter(q => q.difficulty === 'hard')
  );
  
  const playerQuestions: Question[][] = [];
  
  // Track current index for each difficulty to avoid duplicates
  let easyIndex = 0;
  let mediumIndex = 0;
  let hardIndex = 0;
  
  for (let i = 0; i < config.players.length; i++) {
    const player = config.players[i];
    
    // Get difficulty distribution
    let easyPercent: number, mediumPercent: number;
    if (config.scaleByAge) {
      [easyPercent, mediumPercent] = getDifficultyDistributionByAge(player.age);
    } else {
      // Default: 40% easy, 40% medium, 20% hard
      [easyPercent, mediumPercent] = [0.40, 0.40];
    }
    
    // Calculate counts (hardCount is remaining to reach total)
    const easyCount = Math.round(config.questionsPerPlayer * easyPercent);
    const mediumCount = Math.round(config.questionsPerPlayer * mediumPercent);
    const hardCount = config.questionsPerPlayer - easyCount - mediumCount;
    
    // Get questions for this player using tracked indices
    const playerEasy = easyQuestions.slice(easyIndex, easyIndex + easyCount);
    const playerMedium = mediumQuestions.slice(mediumIndex, mediumIndex + mediumCount);
    const playerHard = hardQuestions.slice(hardIndex, hardIndex + hardCount);
    
    // Update indices for next player
    easyIndex += easyCount;
    mediumIndex += mediumCount;
    hardIndex += hardCount;
    
    // Shuffle the combined questions for this player
    const combinedQuestions = shuffleArray([...playerEasy, ...playerMedium, ...playerHard]);
    playerQuestions.push(combinedQuestions);
  }
  
  return playerQuestions;
}
