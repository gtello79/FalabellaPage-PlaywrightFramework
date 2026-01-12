import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Falabella Home Page ', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    test('Should load home page successfully', async () => {
        // Verify that the page title contains "Falabella"
        const title = await homePage.getTitle();
        expect(title).toContain("falabella.com | Todo lo que necesitas en un solo lugar");
    });

    test('should display logo on home page', async () => {
        // Verify that the logo is visible
        const isLogoVisible = await homePage.isLogoVisible();
        expect(isLogoVisible).toBeTruthy();
    });

    test('should display search box on home page', async () => {
        // Verify that the search box is visible
        const isSearchVisible = await homePage.isSearchBoxVisible();
        expect(isSearchVisible).toBeTruthy();
    });

    test('should perform search using search box', async ({ page }) => {
        // Perform a search
        await homePage.search('laptop');

        // Wait for navigation to search results
        await page.waitForURL(/.*search.*/);

        // Verify we're on search results page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('search');
    });

    test('should perform search using Enter key', async ({ page }) => {
        // Perform a search with Enter key
        await homePage.searchWithEnter('smartphone');

        // Wait for navigation to search results
        await page.waitForURL(/.*search.*/);

        // Verify we're on search results page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('search');
    });

    test('should navigate back to home page when logo is clicked', async () => {
        // Click on logo
        await homePage.clickLogo();

        // Verify we're on home page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toMatch(/.*falabella\.com(\/falabella-cl)?$/);
    });
});
