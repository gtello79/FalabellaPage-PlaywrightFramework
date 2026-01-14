import { Page, Locator } from '@playwright/test';

export class WeddingHomePage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }
}