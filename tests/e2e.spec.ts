import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchPage } from '../src/pages/SearchPage';
import { ProductPage } from '../src/pages/ProductPage';

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
    
    // Step 1: Navigate to home page
    await homePage.navigate();
    const title = await homePage.getTitle();
    expect(title).toContain('Falabella');
    
    // Step 2: Verify search box is visible
    const isSearchVisible = await homePage.isSearchBoxVisible();
    expect(isSearchVisible).toBeTruthy();
    
    // Step 3: Perform search
    await homePage.search('computador portátil');
    await searchPage.waitForPageLoad();
    
    // Step 4: Verify search results
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBeTruthy();
    
    const productCount = await searchPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Step 5: Click on first product
    await searchPage.clickProductByIndex(0);
    await productPage.waitForPageLoad();
    
    // Step 6: Verify product details
    const productTitle = await productPage.getProductTitle();
    expect(productTitle).toBeTruthy();
    
    const productPrice = await productPage.getProductPrice();
    expect(productPrice).toBeTruthy();
    
    const isImageLoaded = await productPage.isProductImageLoaded();
    expect(isImageLoaded).toBeTruthy();
  });

  test('search for different products', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    // Test data: different search terms
    const searchTerms = ['celular', 'laptop', 'tablet'];
    
    for (const term of searchTerms) {
      // Navigate to home page
      await homePage.navigate();
      
      // Perform search
      await homePage.search(term);
      await searchPage.waitForPageLoad();
      
      // Verify results
      const hasResults = await searchPage.hasResults();
      expect(hasResults).toBeTruthy();
    }
  });
});
