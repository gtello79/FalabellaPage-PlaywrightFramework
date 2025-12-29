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
 * @returns Price as number, or 0 if invalid
 */
export function parsePriceToNumber(priceString: string): number {
  // Remove currency symbols and whitespace
  let cleaned = priceString.replace(/[^0-9,.]/g, '');
  
  // Return 0 for empty strings
  if (!cleaned) {
    return 0;
  }
  
  // If string has both separators, determine which is decimal
  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');
  
  if (hasComma && hasDot) {
    // Both separators present - the last one is the decimal separator
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    
    if (lastComma > lastDot) {
      // Comma is decimal separator (European format: 1.234,56)
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      // Dot is decimal separator (US format: 1,234.56)
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (hasComma) {
    // Only comma present
    // Check if it's likely a decimal separator (2 digits after) or thousand separator
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      // Likely decimal separator (e.g., "1234,56")
      cleaned = cleaned.replace(',', '.');
    } else {
      // Likely thousand separator (e.g., "1,234,567")
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (hasDot) {
    // Only dot present
    // Check if it's likely a decimal separator (2 digits after) or thousand separator
    const parts = cleaned.split('.');
    if (parts.length === 2 && parts[1].length <= 2) {
      // Likely decimal separator (e.g., "1234.56")
      // Already in correct format
    } else {
      // Likely thousand separator (e.g., "1.234.567")
      cleaned = cleaned.replace(/\./g, '');
    }
  }
  
  const result = parseFloat(cleaned);
  // Return 0 if parsing results in NaN
  return isNaN(result) ? 0 : result;
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
