import { Page } from '@playwright/test';

class CommonClass {
	protected readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	async waitForAPIResponse(url: string) {
		await this.page.waitForResponse((res) => {
			return res.url().includes(url) && res.status() === 200;
		});
	}
}

export default CommonClass;
