import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Falabella Product Detail Page
 * Represents an individual product page with details
 */
export class ProductPage extends BasePage {
  // DOM element locators
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly quantitySelector: Locator;
  readonly buyNowButton: Locator;
  readonly productRating: Locator;
  readonly reviewsSection: Locator;
  readonly productSKU: Locator;
  readonly shareButton: Locator;
  readonly availabilityStatus: Locator;
  readonly colorSelector: Locator;
  readonly sizeSelector: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators for product detail page
    this.productTitle = page.locator('[data-testid="product-title"], h1.product-title');
    this.productPrice = page.locator('[data-testid="product-price"], .product-price, .price-container');
    this.productImage = page.locator('[data-testid="product-image"], .product-image img');
    this.productDescription = page.locator('[data-testid="product-description"], .product-description');
    this.addToCartButton = page.locator('[data-testid="add-to-cart"], button:has-text("Agregar al Carro")');
    this.quantitySelector = page.locator('[data-testid="quantity-selector"], input[name="quantity"]');
    this.buyNowButton = page.locator('[data-testid="buy-now"], button:has-text("Comprar ahora")');
    this.productRating = page.locator('[data-testid="product-rating"], .product-rating');
    this.reviewsSection = page.locator('[data-testid="reviews"], .reviews-section');
    this.productSKU = page.locator('[data-testid="product-sku"], .product-sku');
    this.shareButton = page.locator('[data-testid="share-button"], button[aria-label="Compartir"]');
    this.availabilityStatus = page.locator('[data-testid="availability"], .availability-status');
    this.colorSelector = page.locator('[data-testid="color-selector"], .color-selector');
    this.sizeSelector = page.locator('[data-testid="size-selector"], .size-selector');
  }

  /**
   * Get the product title
   * @returns The product title text
   */
  async getProductTitle(): Promise<string | null> {
    await this.waitForElement(this.productTitle);
    return await this.getText(this.productTitle);
  }

  /**
   * Get the product price
   * @returns The product price text
   */
  async getProductPrice(): Promise<string | null> {
    await this.waitForElement(this.productPrice);
    return await this.getText(this.productPrice);
  }

  /**
   * Get the product description
   * @returns The product description text
   */
  async getProductDescription(): Promise<string | null> {
    await this.waitForElement(this.productDescription);
    return await this.getText(this.productDescription);
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.click(this.addToCartButton);
  }

  /**
   * Set product quantity
   * @param quantity - The quantity to set
   */
  async setQuantity(quantity: number): Promise<void> {
    await this.fill(this.quantitySelector, quantity.toString());
  }

  /**
   * Click buy now button
   */
  async buyNow(): Promise<void> {
    await this.click(this.buyNowButton);
  }

  /**
   * Check if product is available
   * @returns True if product is available
   */
  async isProductAvailable(): Promise<boolean> {
    const status = await this.getText(this.availabilityStatus);
    return status?.toLowerCase().includes('disponible') || false;
  }

  /**
   * Get product rating
   * @returns The rating text or null
   */
  async getProductRating(): Promise<string | null> {
    return await this.getText(this.productRating);
  }

  /**
   * Select a color variant
   * @param colorName - Name of the color
   */
  async selectColor(colorName: string): Promise<void> {
    const colorOption = this.page.locator(`[data-testid="color-${colorName}"], button[aria-label="${colorName}"]`);
    await this.click(colorOption);
  }

  /**
   * Select a size
   * @param size - The size to select (e.g., "S", "M", "L")
   */
  async selectSize(size: string): Promise<void> {
    const sizeOption = this.page.locator(`[data-testid="size-${size}"], button:has-text("${size}")`);
    await this.click(sizeOption);
  }

  /**
   * Share the product
   */
  async shareProduct(): Promise<void> {
    await this.click(this.shareButton);
  }

  /**
   * Scroll to reviews section
   */
  async scrollToReviews(): Promise<void> {
    await this.scrollToElement(this.reviewsSection);
  }

  /**
   * Check if add to cart button is visible
   * @returns True if button is visible
   */
  async isAddToCartVisible(): Promise<boolean> {
    return await this.isVisible(this.addToCartButton);
  }

  /**
   * Get product SKU
   * @returns The SKU text or null
   */
  async getProductSKU(): Promise<string | null> {
    return await this.getText(this.productSKU);
  }

  /**
   * Check if product image is loaded
   * @returns True if image is visible
   */
  async isProductImageLoaded(): Promise<boolean> {
    return await this.isVisible(this.productImage);
  }
}
