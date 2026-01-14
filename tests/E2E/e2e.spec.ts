import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SearchPage } from '../../src/pages/SearchPage';
import { ProductPage } from '../../src/pages/ProductPage';

/**
 * End-to-end test suite for Falabella
 * Tests complete user flows from home page to product page
 */
test.describe('Falabella End-to-End Tests', () => {


  test('complete user journey: search and view product', async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    // Go to Falabella home page
    await homePage.goto('https://www.falabella.com/falabella-cl');

  });

  test('search for different products', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
  
  });
});
