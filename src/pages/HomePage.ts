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

  // Tabs available in the pags
  readonly schoolTab: Locator;
  readonly offersTab: Locator
  readonly arrivesTodayTab: Locator;
  readonly pickUpIn90MinTab: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using data-testid, id, or other stable selectors
    this.searchBox = page.locator('input[id="testId-SearchBar-Input"]');
    this.searchButton = page.locator('button.SearchBar-module_searchBtnIcon__YqTAF');
    this.logo = page.locator('a[id="testId-logo-btn"]');
    this.categoriesMenu = page.locator('nav[aria-label="Categorías"]');
    this.shoppingCart = page.locator('a[aria-label="Carro de Compras"]');
    this.loginButton = page.locator('a[aria-label="Ingresa a tu cuenta"]');

    this.schoolTab = page.getByRole('link', { name: 'Escolares', exact: true });
    this.offersTab = page.getByRole('link', { name: 'Ofertas' });
    this.arrivesTodayTab = page.getByRole('link', { name: 'Llega Hoy' });
    this.pickUpIn90MinTab = page.getByRole('link', { name: 'Retira desde 90min' });
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

  async validateTabVisible(tabName: string): Promise<boolean> {
    switch (tabName) {
      case 'Ofertas':
        return await this.isVisible(this.offersTab);
      case 'Escolar':
        return await this.isVisible(this.schoolTab);
      case 'Llega Hoy':
        return await this.isVisible(this.arrivesTodayTab);
      case 'Retira en 90min':
        return await this.isVisible(this.pickUpIn90MinTab);
    }
    return false;
  }

  async clickTab(tabName: string): Promise<void> {
    switch (tabName) {
      case 'Ofertas':
        await this.click(this.offersTab);
        break;
      case 'Escolar':
        await this.click(this.schoolTab);
        break;
      case 'Llega Hoy':
        await this.click(this.arrivesTodayTab);
        break;
      case 'Retira en 90min':
        await this.click(this.pickUpIn90MinTab);
        break;
    }
  }
}
