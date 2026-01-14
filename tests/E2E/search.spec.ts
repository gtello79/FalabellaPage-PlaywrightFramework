import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchPage } from '../src/pages/SearchPage';

/**
 * Test suite for Falabella Search functionality
 * Tests search results page and filtering
 */
test.describe('Falabella Search Tests', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigate();
  });

  test('should display search results for valid query', async () => {
    // Perform search
    await homePage.search('notebook');
    
    // Wait for results to load
    await searchPage.waitForPageLoad();
    
    // Verify search results are displayed
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBeTruthy();
  });

  test('should display multiple product cards in search results', async () => {
    // Perform search
    await homePage.search('celular');
    
    // Wait for results to load
    await searchPage.waitForPageLoad();
    
    // Get product count
    const productCount = await searchPage.getProductCount();
    
    // Verify at least one product is displayed
    expect(productCount).toBeGreaterThan(0);
  });

  test('should click on first search result', async ({ page }) => {
    // Perform search
    await homePage.search('tablet');
    
    // Wait for results to load
    await searchPage.waitForPageLoad();
    
    // Click on first product
    await searchPage.clickProductByIndex(0);
    
    // Wait for product page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we navigated to a product page
    const currentURL = await searchPage.getCurrentURL();
    expect(currentURL).toContain('product');
  });

  test('should get all product names from search results', async () => {
    // Perform search
    await homePage.search('laptop');
    
    // Wait for results to load
    await searchPage.waitForPageLoad();
    
    // Get all product names
    const productNames = await searchPage.getAllProductNames();
    
    // Verify we have product names
    expect(productNames.length).toBeGreaterThan(0);
  });
});
