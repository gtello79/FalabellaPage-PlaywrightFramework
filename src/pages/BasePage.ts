import { Page, Locator } from '@playwright/test';

/**
 * Base Page class that all page objects inherit from
 * Implements common page actions using the Page Object Model (POM) pattern
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get the page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current URL
   * @returns The current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Click on an element
   * @param locator - The element locator
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill in a text field
   * @param locator - The element locator
   * @param text - The text to fill
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Type text into a field
   * @param locator - The element locator
   * @param text - The text to type
   */
  async type(locator: Locator, text: string): Promise<void> {
    await locator.type(text);
  }

  /**
   * Press a key
   * @param locator - The element locator
   * @param key - The key to press
   */
  async press(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  /**
   * Get text content from an element
   * @param locator - The element locator
   * @returns The text content
   */
  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  /**
   * Check if an element is visible
   * @param locator - The element locator
   * @returns True if visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for an element to be visible
   * @param locator - The element locator
   */
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Scroll to an element
   * @param locator - The element locator
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Take a screenshot
   * @param fileName - The screenshot file name
   */
  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: fileName, fullPage: true });
  }
}
