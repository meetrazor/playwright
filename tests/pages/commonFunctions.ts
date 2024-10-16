import { Page } from '@playwright/test';
import { getURL } from '../../config';

class CommonClass {
	protected readonly page: Page;
	constructor(page: Page) {
		this.page = page;
		page.goto(getURL())
	}

	async waitForAPIResponse(url: string) {
		await this.page.waitForResponse((res) => {
			return res.url().includes(url) && res.status() === 200;
		});
	}

	async navigateToDefaultCompany(){
		await this.page.getByPlaceholder('Search Company').click();
		await this.page.keyboard.type('Procter',{delay:200})
		  await this.page.getByRole('cell', { name: 'THE PROCTER & GAMBLE COMPANY', exact: true }).click();
		  await this.page.getByLabel('Digital Landscapes').getByText('Digital Landscapes').click();
	}
}

export default CommonClass;
