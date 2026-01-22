import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Falabella testing framework
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {

	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				/* Base URL to use in actions like `await page.goto('/')`. */
				baseURL: 'https://www.falabella.com',
				/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
				trace: 'on-first-retry',
				/* Screenshot on failure */
				screenshot: 'only-on-failure',
				/* Video on failure */
				video: 'retain-on-failure',
				testIdAttribute: 'testId',
			},
			testDir: './tests/SmokeTest/HomePage',
		},
		{
			name: 'FalabellaWeddingPage',
			use: {
				...devices['Desktop Chrome'],
				/* Base URL to use in actions like `await page.goto('/')`. */
				/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
				trace: 'on-first-retry',
				/* Screenshot on failure */
				screenshot: 'only-on-failure',
				/* Video on failure */
				video: 'retain-on-failure',
				testIdAttribute: 'testId',
			},
			testDir: './tests/SmokeTest/WeddingPage',
			retries: 1,

		},
		{
			name: 'API Testing',
			use: {
				baseURL: 'https://api.github.com',
				extraHTTPHeaders: {
					'Accept': 'application/vnd.github.v3+json',
					'Authorization': `token ${process.env.API_TOKEN}`,
				}
			},
			testDir: './tests/API',
			retries: 1,

		}

	],
});
