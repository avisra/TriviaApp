/**
 * Player color gradients for visual distinction during gameplay
 * Each player gets a unique, vibrant gradient background
 */
export const PLAYER_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Orange/Pink
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', // Teal/Purple
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Pastel
  'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)', // Coral
];

/**
 * Get the color gradient for a specific player (0-indexed)
 */
export function getPlayerColor(playerIndex: number): string {
  return PLAYER_COLORS[playerIndex % PLAYER_COLORS.length];
}
