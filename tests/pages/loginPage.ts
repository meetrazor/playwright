import { expect, Locator, Page } from '@playwright/test';
import { credentials, DEFAULT_TIMEOUT, getURL } from '../../config';

class LoginPage {
	page: Page;

	userNameInput: Locator;
	passwordInput: Locator;
	loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.userNameInput = page.locator('[data-automation-id="uname"]');
		this.passwordInput = page.locator('[data-automation-id="pwd"]');
		this.loginButton = page.locator('button', { hasText: 'Sign in' });
	}

	async performLogin() {
		await this.page.goto(getURL());
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.userNameInput.fill(credentials.username);
		await this.passwordInput.fill(credentials.password);
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.loginButton.first().click({ force: true });
	
	}

	async verifyLogin() {
		await this.page.waitForURL('**/companyList')
	}
}

export default LoginPage;
