/**
 * Utility functions for test framework
 */

/**
 * Generate a random string
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate a random email
 * @returns Random email address
 */
export function generateRandomEmail(): string {
  const randomString = generateRandomString(10);
  return `test_${randomString}@example.com`;
}

/**
 * Wait for a specified amount of time
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format price string to number
 * @param priceString - Price as string (e.g., "$1.234,56")
 * @returns Price as number
 */
export function parsePriceToNumber(priceString: string): number {
  // Remove currency symbols and convert to number
  const cleaned = priceString.replace(/[^0-9,.]/g, '');
  // Handle different decimal separators
  const normalized = cleaned.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized);
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date string
 */
export function getCurrentDate(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

/**
 * Get timestamp
 * @returns Current timestamp
 */
export function getTimestamp(): number {
  return Date.now();
}
