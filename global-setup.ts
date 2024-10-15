import { chromium } from '@playwright/test';
import { getURL } from './config';

async function globalSetup() {
	//some code
	const browser = await chromium.launch();
	const page = await browser.newPage();
	const url = getURL();
	console.log('going to google');
	await page.goto(url);

	console.log('working');
}

export default globalSetup;
