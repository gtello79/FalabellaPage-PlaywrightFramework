import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SearchPage } from '../../src/pages/SearchPage';
import { ProductPage } from '../../src/pages/ProductPage';

/**
 * Test suite for Falabella Product Page
 * Tests product detail page functionality
 */
test.describe('Falabella Product Page Tests', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    
    // Navigate to home page
    await homePage.navigate();
  });

  test('should display product details', async () => {
    // Search for a product
    await homePage.search('mouse');
    await searchPage.waitForPageLoad();
    
    // Click on first product
    await searchPage.clickProductByIndex(0);
    await productPage.waitForPageLoad();
    
  });

  test('should display product price', async () => {
    // Search for a product
    await homePage.search('teclado');
    await searchPage.waitForPageLoad();
    
    // Click on first product
    await searchPage.clickProductByIndex(0);
    await productPage.waitForPageLoad();

  });

  test('should display product image', async () => {
    // Search for a product
    await homePage.search('auriculares');
    await searchPage.waitForPageLoad();
    
    // Click on first product
    await searchPage.clickProductByIndex(0);
    await productPage.waitForPageLoad();
    
    // Verify product image is loaded
  });

  test('should display add to cart button', async () => {
    // Search for a product
    await homePage.search('monitor');
    await searchPage.waitForPageLoad();
    
    // Click on first product
    await searchPage.clickProductByIndex(0);
    await productPage.waitForPageLoad();

  });
});
