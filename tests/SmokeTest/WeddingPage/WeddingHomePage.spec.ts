import { test, expect, Page } from '@playwright/test';
import { WeddingHomePage } from '../../../src/pages/WeddingHomePage';

test.describe('Validate Falabella Wedding Page ', () => {
    let weddingPage: WeddingHomePage;
    
    test.beforeEach(async ({ page }) => {
        weddingPage = new WeddingHomePage(page);
        await weddingPage.navigateTo();
    });

    test('Verify title in Wedding Page', async ({ page }) => {
        // Navigate to Home Page
        let titleWedding = await page.title();
        await weddingPage.validateTitle();
    });
});