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
 * Handles different formats like "$1.234,56" or "$1,234.56"
 * @param priceString - Price as string
 * @returns Price as number
 */
export function parsePriceToNumber(priceString: string): number {
  // Remove currency symbols and whitespace
  let cleaned = priceString.replace(/[^0-9,.]/g, '');
  
  // Determine which separator is decimal based on position
  // The decimal separator is typically the last separator
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  
  if (lastComma > lastDot) {
    // Comma is the decimal separator (e.g., "1.234,56")
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (lastDot > lastComma) {
    // Dot is the decimal separator (e.g., "1,234.56")
    cleaned = cleaned.replace(/,/g, '');
  } else {
    // No decimal separator or only one separator
    // If length after separator is 3, it's a thousand separator, remove it
    if (cleaned.includes('.') && cleaned.split('.')[1]?.length === 3) {
      cleaned = cleaned.replace('.', '');
    } else if (cleaned.includes(',') && cleaned.split(',')[1]?.length === 3) {
      cleaned = cleaned.replace(',', '');
    } else {
      // Assume it's a decimal separator, normalize to dot
      cleaned = cleaned.replace(',', '.');
    }
  }
  
  return parseFloat(cleaned);
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
