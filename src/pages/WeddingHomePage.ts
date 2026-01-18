import { Page, Locator, expect } from '@playwright/test';

export class WeddingHomePage {
  readonly page: Page;

  readonly urlWeddingPage: string = 'https://novios.falabella.com/';

  readonly weddingTitle:string = 'Novios Falabella, Novios, Lista de regalo, Premio, Aportes, Luna de Miel';
  readonly carruselIndicatorButton: string;
  readonly totalPromos: number = 4;
  readonly conveniosSection: Locator;
  readonly conveniosTitle: Locator;
  readonly celebrationSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carruselIndicatorButton = "carousel indicator ";
    this.conveniosSection = page.locator('#section-convenios');
    this.conveniosTitle = page.locator('h2', { hasText: 'Los mejores Convenios' });
    this.celebrationSection = page.getByRole('button', { name: "carousel indicator 1" });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.urlWeddingPage);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async validateTitle(): Promise<void> {
    const actualTitle = await this.getTitle();
    await expect(actualTitle).toBe(this.weddingTitle);
  }

  async isCarruselIndicatorVisible(index: number): Promise<void> {
    const buttonLocator = this.carruselIndicatorButton + index;
    
    const indicatorButton = this.page.getByRole('button', { name: buttonLocator });
    await expect(indicatorButton).toBeVisible();
    await expect(indicatorButton).toBeEnabled();
  }

  async validateConveniosSectionIsVisible(): Promise<void> {
    await expect(this.conveniosSection).toBeVisible();
  }

  async validateConveniosTitleIsVisible(): Promise<void> {
    await expect(this.conveniosTitle).toBeVisible();
  }

  async clickOnCelebrationSection(): Promise<void> {
    await this.celebrationSection.click();
  }

  async validateCelebrationSectionIsVisible(): Promise<void> {
    await expect(this.celebrationSection).toBeVisible();
  }

  async validateCelebrationSectionIsEnabled(): Promise<void> {
    await expect(this.celebrationSection).toBeEnabled();
  }
}