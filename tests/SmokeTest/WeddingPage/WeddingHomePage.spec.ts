import { test, expect, Page } from '@playwright/test';
import { WeddingHomePage } from '../../../src/pages/WeddingHomePage';

test.describe('Validate Falabella Wedding Page ', () => {
    let weddingPage: WeddingHomePage;

    test.beforeEach(async ({ page }) => {
        weddingPage = new WeddingHomePage(page);
        await weddingPage.navigateTo();
    });

    test('Verify title in Wedding Page', async ({ }) => {
        // Navigate to Home Page
        await weddingPage.validateTitle();
    });

    test('Verify Carrusel promotions is visible', async ({ }) => {
        for (let i = 1; i <= weddingPage.totalPromos; i++) {
            await weddingPage.isCarruselIndicatorVisible(i);
        }
    });

    test('Verify Convenios section is available', async ({ }) => {
        await weddingPage.validateConveniosSectionIsVisible();
    });

    test('Verify that Convenios title is visible and contains the correct text', async ({ }) => {
        await weddingPage.validateConveniosTitleIsVisible();
    });

    test('Verify presence of Wedding Gift List link', async ({ }) => {
        await weddingPage.clickOnCelebrationSection();
        await weddingPage.validateCelebrationSectionIsVisible();
        await weddingPage.validateCelebrationSectionIsEnabled();
    });
});