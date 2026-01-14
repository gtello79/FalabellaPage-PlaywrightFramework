import { Page, Locator, expect } from '@playwright/test';

export class WeddingHomePage {
  readonly page: Page;

  readonly urlWeddingPage: string = 'https://novios.falabella.com/';

  readonly weddingTitle:string = 'Novios Falabella, Novios, Lista de regalo, Premio, Aportes, Luna de Miel';


  constructor(page: Page) {
    this.page = page;
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
}