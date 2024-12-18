import { defineConfig, devices } from '@playwright/test';
import { sessionPath } from './config';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	testDir: './tests',
	testMatch: '*.spec.ts',
	grep: [/@Regression/, /@Smoke/],
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process?.env.CI,
	/* Retry on CI only */
	retries: 2,
	/* Opt out of parallel tests on CI. */
	workers: process?.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	timeout: 1000 * 60 * 2,
	expect:{timeout:15 * 1000},
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		bypassCSP: true,
		launchOptions: { headless: false ,slowMo:200},
		storageState: sessionPath,
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry'
	}

	/* Configure projects for major browsers */
	// projects: [
	// 	// {
	// 	// 	name: 'chromium',
	// 	// 	use: { ...devices['Desktop Chrome'] }
	// 	// },
	// 	// {
	// 	// 	name: 'firefox',
	// 	// 	use: { ...devices['Desktop Firefox'] }
	// 	// },
	// 	// {
	// 	// 	name: 'webkit',
	// 	// 	use: { ...devices['Desktop Safari'] }
	// 	// },
	// 	/* Test against mobile viewports. */
	// 	// {
	// 	//   name: 'Mobile Chrome',
	// 	//   use: { ...devices['Pixel 5'] },
	// 	// },
	// 	// {
	// 	//   name: 'Mobile Safari',
	// 	//   use: { ...devices['iPhone 12'] },
	// 	// },
	// 	/* Test against branded browsers. */
	// 	// {
	// 	//   name: 'Microsoft Edge',
	// 	//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
	// 	// },
	// 	{
	// 		name: 'Chrome',
	// 		use: {
	// 			...devices['Desktop Chrome'],
	// 			channel: 'chrome'
	// 		}
	// 	}
	// ]

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
