import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Falabella Home Page
 * Represents the main landing page of Falabella website
 */
export class HomePage extends BasePage {
  // DOM element locators
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly categoriesMenu: Locator;
  readonly shoppingCart: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using data-testid, id, or other stable selectors
    this.searchBox = page.locator('input[id="testId-SearchBar-Input"]');
    this.searchButton = page.locator('button.SearchBar-module_searchBtnIcon__YqTAF');
    this.logo = page.locator('a[id="testId-logo-btn"]');
    this.categoriesMenu = page.locator('nav[aria-label="Categorías"]');
    this.shoppingCart = page.locator('a[aria-label="Carro de Compras"]');
    this.loginButton = page.locator('a[aria-label="Ingresa a tu cuenta"]');
  }

  /**
   * Navigate to Falabella home page
   */
  async navigate(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Perform a search using the search box
   * @param searchTerm - The term to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.fill(this.searchBox, searchTerm);
    
    // Incluide a 
    await this.click(this.searchButton);
  }

  /**
   * Perform a search and press Enter
   * @param searchTerm - The term to search for
   */
  async searchWithEnter(searchTerm: string): Promise<void> {
    await this.fill(this.searchBox, searchTerm);
    await this.press(this.searchBox, 'Enter');
  }

  /**
   * Click on the logo to return to home page
   */
  async clickLogo(): Promise<void> {
    await this.click(this.logo);
  }

  /**
   * Navigate to shopping cart
   */
  async goToShoppingCart(): Promise<void> {
    await this.click(this.shoppingCart);
  }

  /**
   * Click on login button
   */
  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Check if search box is visible
   * @returns True if search box is visible
   */
  async isSearchBoxVisible(): Promise<boolean> {
    return await this.isVisible(this.searchBox);
  }

  /**
   * Check if logo is visible
   * @returns True if logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.isVisible(this.logo);
  }

  /**
   * Navigate to a specific category
   * @param categoryName - Name of the category
   */
  async navigateToCategory(categoryName: string): Promise<void> {
    const categoryLink = this.page.locator(`a:has-text("${categoryName}")`);
    await this.click(categoryLink);
  }
}
