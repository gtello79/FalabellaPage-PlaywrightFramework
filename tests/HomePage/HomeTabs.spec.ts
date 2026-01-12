import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../src/pages';
import { url } from 'node:inspector';

test.describe('Validate Tabs visible in Falabella Home Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    const tabsTest = [
        { name: 'Ofertas', titlePage: 'Ofertas Falabella' },
        { name: 'Escolar', titlePage: 'Vuelta a Clases 2026' },
        { name: 'Llega Hoy', titlePage: 'Llega hoy!' },
        { name: 'Retira en 90min', titlePage: 'Retiro 90 minutos' },
    ];
    for (const tab of tabsTest) {
        test(`should display ${tab.name} tab on home page`, async () => {
            homePage.validateTabVisible(tab.name).then(async (isVisible) => {
                expect(isVisible).toBeTruthy();

            });
            await homePage.clickTab(tab.name);

            const title = await homePage.getTitle();
            if (tab.titlePage) {
                expect(title).toContain(tab.titlePage);
            }

        });
    }
});