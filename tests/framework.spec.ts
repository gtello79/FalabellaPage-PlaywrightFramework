import { test, expect } from '@playwright/test';
import { HomePage, SearchPage, ProductPage, BasePage } from '../src/pages';
import * as helpers from '../src/utils/helpers';

/**
 * Framework validation tests
 * These tests validate the framework structure without requiring internet access
 */
test.describe('Framework Validation Tests', () => {
  test('should import page objects successfully', () => {
    // Test that page objects can be imported
    expect(HomePage).toBeDefined();
    expect(SearchPage).toBeDefined();
    expect(ProductPage).toBeDefined();
    expect(BasePage).toBeDefined();
  });

  test('should import utility helpers successfully', () => {
    // Test that helpers can be imported
    expect(helpers.generateRandomString).toBeDefined();
    expect(helpers.generateRandomEmail).toBeDefined();
    expect(helpers.parsePriceToNumber).toBeDefined();
    expect(helpers.getCurrentDate).toBeDefined();
    expect(helpers.getTimestamp).toBeDefined();
  });

  test('should generate random string', () => {
    const randomStr = helpers.generateRandomString(10);
    expect(randomStr).toHaveLength(10);
    expect(typeof randomStr).toBe('string');
  });

  test('should generate random email', () => {
    const email = helpers.generateRandomEmail();
    expect(email).toContain('@');
    expect(email).toContain('test_');
    expect(email).toContain('example.com');
  });

  test('should parse price to number', () => {
    // Test European format (dot as thousand, comma as decimal)
    const price1 = helpers.parsePriceToNumber('$1.234,56');
    expect(price1).toBe(1234.56);
    
    // Test US format (comma as thousand, dot as decimal)
    const price2 = helpers.parsePriceToNumber('$1,234.56');
    expect(price2).toBe(1234.56);
    
    // Test simple number without thousand separator
    const price3 = helpers.parsePriceToNumber('$999');
    expect(price3).toBe(999);
    
    // Test with decimal
    const price4 = helpers.parsePriceToNumber('$99.50');
    expect(price4).toBe(99.50);
    
    // Test edge cases
    const price5 = helpers.parsePriceToNumber('');
    expect(price5).toBe(0);
    
    const price6 = helpers.parsePriceToNumber('invalid');
    expect(price6).toBe(0);
  });

  test('should get current date', () => {
    const date = helpers.getCurrentDate();
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('should get timestamp', () => {
    const timestamp = helpers.getTimestamp();
    expect(typeof timestamp).toBe('number');
    expect(timestamp).toBeGreaterThan(0);
  });
});
