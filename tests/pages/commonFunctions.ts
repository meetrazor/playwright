import { Locator, Page } from '@playwright/test';
import { getURL } from '../../config';
import { billboard, billboardProd, billboardStg } from '../../shared/routes';
import SessionConversionPage from './sessionConversionPage';
import SessionSharePage from './sessionSharePage';
import fs from 'fs';
import path from 'path';
import DonutPage from './donutPage';

class CommonClass {
	protected readonly page: Page;
	readonly #downloadPath = path.resolve(__dirname, '../../downloads');
	constructor(page: Page) {
		this.page = page;
		page.goto(getURL());
	}

	get sessionConvPage() {
		return new SessionConversionPage(this.page);
	}
	get sessionShPage() {
		return new SessionSharePage(this.page);
	}
	get sotDonutPage() {
		return new DonutPage(this.page);
	}

	async waitForAPIResponse(url: string) {
		await this.page.waitForResponse((res) => {
			return res.url().includes(url) && res.status() === 200;
		});
	}

	async navigateToDefaultCompany() {
		await this.page.getByPlaceholder('Search Company').click();
		await this.page.keyboard.type('Procter', { delay: 200 });
		await this.page
			.getByRole('cell', {
				name: 'THE PROCTER & GAMBLE COMPANY',
				exact: true
			})
			.click();
		await this.page
			.getByLabel('Digital Landscapes')
			.getByText('Digital Landscapes')
			.click();
	}

	async getCompanyId() {
		let url = '';
		if (process.env.ENV === 'QA') {
			url =
				'https://stg.walmartluminate.com/core-app-api/internalApp/DIGITAL_LANDSCAPES/userContext';
		} else if (process.env.ENV === 'PROD') {
			url =
				'https://www.walmartluminate.com/core-app-api/internalApp/DIGITAL_LANDSCAPES/userContext';
		} else {
			url =
				'https://dev.walmartluminate.com/core-app-api/internalApp/DIGITAL_LANDSCAPES/userContext';
		}

		const response = await this.page.request.get(url);
		const jsonResponse = await response.json();
		return jsonResponse.result.luminateCompanyId;
	}

	async getBillboardAPIURL() {
		if (process.env.ENV === 'QA') {
			return billboardStg;
		} else if (process.env.ENV === 'PROD') {
			return billboardProd;
		} else {
			return billboard;
		}
	}
	async getHeadersAndCookies(token: string) {
		const cookieValue = token;
		const headers = {
			'Content-Type': 'application/json',
			Connection: 'keep-alive',
			Cookie: cookieValue
		};

		return headers;
	}
	async getHeadersAndCookiesWithRefer(token: string) {
		const cookieValue = token;
		const headers = {
			'Content-Type': 'application/json',
			Connection: 'keep-alive',
			referer: `${getURL()}/conversion`,
			Cookie: cookieValue
		};

		return headers;
	}
	getPayloadBillboardTerm(
		dateStart: string,
		dateEnd: string,
		category: string,
		compnyId: string
	) {
		const billboardPayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [compnyId],
			categories: [category],
			brands: [],
			upcs: [],
			comparisonType: 'timePeriod'
		};
		return billboardPayloads;
	}

	getPayloadBillboardTermForUpc(
		dateStart: string,
		dateEnd: string,
		upc: string,
		cmpnyId: string
	) {
		const billboardPayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpnyId],
			categories: [],
			brands: [],
			upcs: [upc]
		};
		return billboardPayloads;
	}

	getPayloadTable(
		dateStart: string,
		dateEnd: string,
		category: string,
		cmpnyId: string
	) {
		const billboardPayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpnyId],
			categories: [category],
			brands: [],
			upcs: [],
			source: 'category',
			comparisonType: "timePeriod"
		};
		return billboardPayloads;
	}

	getTablePayloadForUpc(
		dateStart: string,
		dateEnd: string,
		upc: string,
		compnyId: string
	) {
		const billboardPayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [compnyId],
			categories: [],
			brands: [],
			upcs: [upc],
			source: 'item',
			comparisonType: "timePeriod"
		};
		return billboardPayloads;
	}

	getPayloadAreaChart(
		dateStart: string,
		dateEnd: string,
		category: string,
		intervalReceived: string,
		cmpanyIdReceived: string
	) {
		const AreaPayloads = {
			interval: intervalReceived,
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpanyIdReceived],
			categories: [category],
			brands: [],
			upcs: [],
			comparisonType: 'timePeriod'
		};
		return AreaPayloads;
	}

	getLinePayloadForCategory(
		dateStart: string,
		dateEnd: string,
		categoryNbr: string,
		intervals: string,
		cmpanyIdReceived: string
	) {
		const billboardPayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpanyIdReceived],
			categories: [categoryNbr],
			brands: [],
			upcs: [],
			interval: intervals,
			comparisonType: 'timePeriod'
		};
		return billboardPayloads;
	}

	getsotLinePayloadForCategory(
		dateStart: string,
		dateEnd: string,
		categoryNbr: string,
		intervals: string,
		cmpanyIdReceived: string,
		sources: string
	) {
		const sotlinePayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpanyIdReceived],
			categories: [categoryNbr],
			brands: [],
			upcs: [],
			source: sources,
			interval: intervals
		};
		return sotlinePayloads;
	}

	getsotLinePayloadForUPC(
		dateStart: string,
		dateEnd: string,
		aUpc: string,
		Upcs: string,
		intervals: string,
		cmpanyIdReceived: string,
		sources: string
	) {
		const sotlinePayloads = {
			startDate: dateStart,
			endDate: dateEnd,
			platform: ['web', 'app'],
			companyIDs: [cmpanyIdReceived],
			categories: [],
			brands: [],
			upcs: [aUpc, Upcs],
			source: sources,
			interval: intervals
		};
		return sotlinePayloads;
	}

	async checkFileDownloaded(triggerSelector: Locator) {
		// Ensure the download directory exists
		if (!fs.existsSync(this.#downloadPath)) {
			fs.mkdirSync(this.#downloadPath, { recursive: true });
		}

		// Wait for the download event and trigger the download action
		const [download] = await Promise.all([
			this.page.waitForEvent('download'), // Wait for the download to start
			triggerSelector.click() // This should trigger the file download
		]);

		// Save the downloaded file to the specified path
		const fileName = download.suggestedFilename();
		const filePath = path.join(this.#downloadPath, fileName);

		// Wait for the download to finish and save to the specified path
		await download.saveAs(filePath);

		// Check if the file exists after download
		const fileExists = fs.existsSync(filePath);

		if (fileExists) {
			return true;
		} else {
			return false;
		}
	}
	async deleteDownloadedFile() {
		// Delete all files in the downloads folder
		try {
			const files = fs.readdirSync(this.#downloadPath);
			for (const file of files) {
				const filePath = path.join(this.#downloadPath, file);
				fs.unlinkSync(filePath);
			}
		} catch (err) {
			console.error('Error deleting files: ', err);
		}
	}

	async getCookie() {
		const cookie = await this.page.context().cookies();
		const cookieString = cookie.reduce((acc, curr) => {
			return `${acc} ${curr.name}=${curr.value};`;
		}, '');

		return cookieString;
	}
}

export default CommonClass;
