import test from '@playwright/test';
import LoginPage from './pages/loginPage';

test('should login', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.performLogin();
	await loginPage.verifyLogin();
});
