import { chromium } from '@playwright/test';
import { sessionPath } from './config';
import LoginPage from './tests/pages/loginPage';
import fs from 'fs';

async function globalSetup() {
	if (fs.existsSync(sessionPath)) {
		fs.unlinkSync(sessionPath);
	}
	//some code
	const browser = await chromium.launch();
	const page = await browser.newPage();
	const loginPage = new LoginPage(page);
	await loginPage.performLogin();
	await loginPage.verifyLogin();

	await page.context().storageState({ path: sessionPath });

	await browser.close();
}

export default globalSetup;
