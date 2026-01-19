import { test, expect, Page } from '@playwright/test';
import { WeddingHomePage } from '../../../src/pages/WeddingHomePage';

test.describe('Validate Falabella @WeddingPage ', () => {
    let weddingPage: WeddingHomePage;


    test.beforeEach(async ({ page }) => {
        weddingPage = new WeddingHomePage(page);
        await weddingPage.navigateTo();
    });

    test('Verify title in @WeddingPage', async ({ }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the title of the Wedding Home Page and Logo is correct and visible'
            }
        );
        // Navigate to Home Page
        await weddingPage.validateLogoIsVisible();
        await weddingPage.validateTitle();

        await test.info().attach(
            'screenshot',
            { 
                body: await weddingPage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('Verify Carrusel promotions is visible', async ({ }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the carrusel indicators are visible'
            }
        );
        for (let i = 1; i <= weddingPage.totalPromos; i++) {
            await weddingPage.isCarruselIndicatorVisible(i);
        }

        await test.info().attach(
            'screenshot',
            { 
                body: await weddingPage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('Verify Convenios section is available', async ({ }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the Convenios section is visible'
            }
        );
        await weddingPage.validateConveniosSectionIsVisible();

        await test.info().attach(
            'screenshot',
            { 
                body: await weddingPage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('Verify that Convenios title is visible and contains the correct text', async ({ }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the Convenios title is visible'
            }
        );
        await weddingPage.validateConveniosTitleIsVisible();

        await test.info().attach(
            'screenshot',
            { 
                body: await weddingPage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });

    test('Verify presence of Wedding Gift List link', async ({ }) => {
        test.info().annotations.push(
            {
                type: 'SmokeTest',
                description: 'Validate that the Wedding Gift List link is visible and enabled'
            }
        );
        await weddingPage.clickOnCelebrationSection();
        await weddingPage.validateCelebrationSectionIsVisible();
        await weddingPage.validateCelebrationSectionIsEnabled();

        await test.info().attach(
            'screenshot',
            { 
                body: await weddingPage.page.screenshot(),
                contentType: 'image/png'
            }
        )
    });
});