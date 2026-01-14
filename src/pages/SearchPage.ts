import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Falabella Search Results Page
 * Represents the search results page after performing a search
 */
export class SearchPage extends BasePage {
  // DOM element locators
  readonly searchResults: Locator;
  readonly productCards: Locator;
  readonly sortDropdown: Locator;
  readonly filtersPanel: Locator;
  readonly priceFilter: Locator;
  readonly brandFilter: Locator;
  readonly pagination: Locator;
  readonly resultsCount: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators for search results page
    this.searchResults = page.locator('[data-testid="search-results"]');
    this.productCards = page.locator('#testId-searchResults-products a[data-pod="catalyst-pod"]').filter({ has: page.locator('img') });
    this.sortDropdown = page.locator('select[id="sort-by"], [data-testid="sort-dropdown"]');
    this.filtersPanel = page.locator('[data-testid="filters-panel"], .filters-container');
    this.priceFilter = page.locator('[data-testid="price-filter"], .price-filter');
    this.brandFilter = page.locator('[data-testid="brand-filter"], .brand-filter');
    this.pagination = page.locator('[data-testid="pagination"], .pagination');
    this.resultsCount = page.locator('[data-testid="results-count"], .results-count');
    this.noResultsMessage = page.locator('[data-testid="no-results"], .no-results-message');
    
  }

  /**
   * Get the number of search results displayed
   * @returns Number of product cards visible
   */
  async getProductCount(): Promise<number> {
    try {
      // Wait for products with a shorter timeout
      await this.productCards.first().waitFor({ state: 'visible', timeout: 5000 });
      return await this.productCards.count();
    } catch {
      // No products found
      return 0;
    }
  }

  /**
   * Click on a product by index
   * @param index - Zero-based index of the product
   */
  async clickProductByIndex(index: number): Promise<void> {
    const product = this.productCards.nth(index);
    await this.click(product);
  }

  /**
   * Click on a product by name
   * @param productName - Name of the product to click
   */
  async clickProductByName(productName: string): Promise<void> {
    const product = this.page.locator(`[data-testid="pod-card"]:has-text("${productName}")`);
    await this.click(product);
  }

  /**
   * Get the text of the first product
   * @returns The product name or null
   */
  async getFirstProductName(): Promise<string | null> {
    const firstProduct = this.page.getByRole('listitem').filter({ hasText: "mouse"}).first();
    await this.waitForElement(firstProduct);
    return await this.getText(firstProduct);
  }

  /**
   * Apply a price filter
   * @param minPrice - Minimum price
   * @param maxPrice - Maximum price
   */
  async filterByPrice(minPrice: number, maxPrice: number): Promise<void> {
    await this.click(this.priceFilter);
    const minInput = this.page.locator('[data-testid="price-min"], input[name="price-min"]');
    const maxInput = this.page.locator('[data-testid="price-max"], input[name="price-max"]');
    await this.fill(minInput, minPrice.toString());
    await this.fill(maxInput, maxPrice.toString());
  }

  /**
   * Apply a brand filter
   * @param brandName - Name of the brand
   */
  async filterByBrand(brandName: string): Promise<void> {
    await this.click(this.brandFilter);
    const brandCheckbox = this.page.locator(`input[value="${brandName}"], label:has-text("${brandName}")`);
    await this.click(brandCheckbox);
  }

  /**
   * Sort results
   * @param sortOption - Sort option (e.g., "price-asc", "price-desc", "relevance")
   */
  async sortBy(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * Check if search results are displayed
   * @returns True if results are visible
   */
  async hasResults(): Promise<boolean> {
    return await this.isVisible(this.productCards.first());
  }

  /**
   * Check if "no results" message is displayed
   * @returns True if no results message is visible
   */
  async hasNoResults(): Promise<boolean> {
    return await this.isVisible(this.noResultsMessage);
  }

  /**
   * Navigate to next page of results
   */
  async goToNextPage(): Promise<void> {
    const nextButton = this.page.locator('[data-testid="next-page"], .pagination-next, button:has-text("Siguiente")');
    await this.click(nextButton);
  }

  /**
   * Navigate to a specific page number
   * @param pageNumber - The page number to navigate to
   */
  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.page.locator(`[data-testid="page-${pageNumber}"], button:has-text("${pageNumber}")`);
    await this.click(pageButton);
  }

  /**
   * Get all product names from the current page
   * @returns Array of product names
   */
  async getAllProductNames(): Promise<(string | null)[]> {
    const count = await this.getProductCount();
    const names: (string | null)[] = [];
    for (let i = 0; i < count; i++) {
      const product = this.productCards.nth(i);
      const name = await this.getText(product);
      names.push(name);
    }
    return names;
  }
}
