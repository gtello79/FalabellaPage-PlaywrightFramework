import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { WeddingHomePage } from '../../../src/pages/WeddingHomePage';

test.describe('Validate Falabella Wedding Page ', () => {
    let homePage: HomePage;
    let weddingPage: WeddingHomePage;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        weddingPage = new WeddingHomePage(page);
        await homePage.navigate();
        await homePage.goToWeddingTab();
    });
});