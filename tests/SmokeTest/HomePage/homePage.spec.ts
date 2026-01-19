import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';

test.describe('Falabella Home Page ', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    test('Should load home page successfully', async () => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the Home Page loads successfully'
            }
        );
        // Verify that the page title contains "Falabella"
        const title = await homePage.getTitle();
        expect(title).toContain("falabella.com | Todo lo que necesitas en un solo lugar");
        await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('should display logo on home page', async () => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the logo is visible on the Home Page'
            }
        );
        // Verify that the logo is visible
        const isLogoVisible = await homePage.isLogoVisible();
        expect(isLogoVisible).toBeTruthy();
         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('should display search box on home page', async () => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the search box is visible on the Home Page'
            }
        );
        // Verify that the search box is visible
        const isSearchVisible = await homePage.isSearchBoxVisible();
        expect(isSearchVisible).toBeTruthy();
         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('should perform search using search box', async ({ page }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the search functionality works using the search box'
            }
        );
        // Perform a search
        await homePage.search('laptop');

        // Wait for navigation to search results
        await page.waitForURL(/.*search.*/);

        // Verify we're on search results page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('search');
         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('should perform search using Enter key', async ({ page }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the search functionality works using the Enter key'
            }
        );
        // Perform a search with Enter key
        await homePage.searchWithEnter('smartphone');

        // Wait for navigation to search results
        await page.waitForURL(/.*search.*/);

        // Verify we're on search results page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('search');
         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('should navigate back to home page when logo is clicked', async () => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that clicking the logo navigates back to the Home Page'
            }
        );
        // Click on logo
        await homePage.clickLogo();

        // Verify we're on home page
        const currentURL = await homePage.getCurrentURL();
        expect(currentURL).toMatch(/.*falabella\.com(\/falabella-cl)?$/);

         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        );
    });

    test('Should validate Wedding Page is available', async () => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the Wedding Page tab is visible and accessible'
            }
        );
        await homePage.isWeddingTabVisible().then(async (isVisible) => {
            expect(isVisible).toBeTruthy();
        });
    
        // Verify that the search box is visible
        await homePage.goToWeddingTab();

         await test.info().attach(
            'screenshot',
            { 
                body: await homePage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });
});
