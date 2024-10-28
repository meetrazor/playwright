import { Page, expect } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '../../config';
import performancePage from './performancePage';
import { donutChart } from '../../shared/apiEndpoints';
import {
	sotline,
	sotlineProd,
	sotlineStg,
	sotTable,
	sotTableProd,
	sotTableStg,
	table,
	tableProd,
	tableStg
} from '../../shared/routes';

class DonutPage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	// Donut Page Elements
	donutPageElements = {
		donutChart: () => this.page.locator('div[id="donut-chart"]'),
		donutMetrics: (metricsName: string) =>
			this.page.locator(
				`//*[@id='donut-chart']/div/div[@class='am5-focus-container']/div[contains(@aria-label,"${metricsName}")]`
			),
		sotDetails: () =>
			this.page.locator(
				"//a[@href='/digitallandscapes/source-of-traffic']"
			),
		sotDetailsPageVisibility: () =>
			this.page.locator('//div[ @title="Source of Traffic"]'),
		sotLineChart: () => this.page.locator('//div[@id="line-chart"]'),
		sotLegends: () =>
			this.page.locator('.am5-focus-container [role="checkbox"]'),
		sotFilterTrendChartApplied: (filter: string) =>
			this.page.locator(`//button[text()='${filter}']`),
		sotChartMenuOption: (filter: string) =>
			this.page.locator(`//span[text()='${filter}']`),
		tableColumnXpath: (cellNumber: string) =>
			this.page.locator(
				`//tr[@class='w_Gp']/td[${cellNumber}]/span/div/div`
			),
		tableFilter: () =>
			this.page.locator("button[data-test-cy='All Sources-value']"),
		tableFilterMenu: () => this.page.locator('.w_FZ[role="menu"]'),
		tableFilterMenuBtn: () =>
			this.page.locator('.w_FZ[role="menu"] button'),
		tableMenuFilter: (filter: string) =>
			this.page.locator(`//button//span[text()='${filter}']`),
		tableCell: (cellNumber: string) =>
			this.page.locator(
				`//tr[1][@class='w_Gp']/td[${cellNumber}]/span/span`
			),
		noDataTable: () =>
			this.page.locator('//p[text()="There is no data to display"]'),
		donutHoverText: () =>
			this.page.locator(
				"//h4[text()='Source of Traffic by Product Detail Page Views (PDP)']"
			),
		messageAfterHover: () =>
			this.page.locator(
				"//p[text()='Breakdown of Product Detail Page views by traffic sources. See details for individual external sources.']"
			),
		donutHoverTextTrendChart: () =>
			this.page.locator("//h4[text()='Source of Traffic Trend']"),
		messageAfterHoverTrendChart: () =>
			this.page.locator(
				"//p[text()='Traffic source trend over time for your selected products over the specified date range.']"
			),
		sort: (filter: string) =>
			this.page.locator(`//button//span[text()='${filter}']`)
	};

	// Methods
	async donutChartPresence() {
		return this.donutPageElements.donutChart();
	}

	async checkDonutMetrics(metricsName: string) {
		return this.donutPageElements.donutMetrics(metricsName);
	}

	async tabelMenuButton() {
		return this.donutPageElements.tableFilter();
	}

	async tableMenuFilterSelect(filter: string) {
		return this.donutPageElements.tableMenuFilter(filter);
	}

	async seeDetailsLinkSOTChart() {
		return this.donutPageElements.sotDetails();
	}

	async sotDetails() {
		return this.donutPageElements.sotDetailsPageVisibility();
	}

	async sotLineChart() {
		return this.donutPageElements.sotLineChart();
	}

	async checkSotTrendChartsDimensions() {
		const expectedLabels = [
			'Mobile App Non-Search',
			'Mobile App Search',
			'Walmart.com External',
			'Walmart.com Non-Search',
			'Walmart.com Search'
		];
		const checkboxes = await this.donutPageElements.sotLegends().all();
		expect(checkboxes.length).toEqual(expectedLabels.length);
		for await (const label of expectedLabels) {
			expect(
				checkboxes.some(
					async (checkbox) =>
						await checkbox
							.textContent()
							.then((text) => text?.includes(label))
				)
			).toBeTruthy();
		}
	}
	async checkSotTrendChartsDimensionsForApp() {
		const expectedLabels = ['Mobile App Non-Search', 'Mobile App Search'];

		const checkboxes = await this.donutPageElements.sotLegends().all();
		expect(checkboxes.length).toEqual(expectedLabels.length);
		for await (const label of expectedLabels) {
			expect(
				checkboxes.some(
					async (checkbox) =>
						await checkbox
							.textContent()
							.then((text) => text?.includes(label))
				)
			).toBeTruthy();
		}
	}

	async noDataTextTable() {
		return this.donutPageElements.noDataTable();
	}

	async sotTrendsDefaultDlyAllSrcSelection(filter: string) {
		return this.donutPageElements.sotFilterTrendChartApplied(filter);
	}

	async selectDailyWeeklySOTTrend(filter: string) {
		return this.donutPageElements.sotChartMenuOption(filter);
	}

	async getTableLabelValue(cellNumber: string) {
		const text = await this.donutPageElements
			.tableColumnXpath(cellNumber)
			.textContent();
		return text;
	}

	async checkDataInTableRows() {
		const rows = await this.page
			.locator('td.w_GZ.w_Ga.Table-module_fixedColumnBody__HBTQc')
			.all();
		for (const row of rows) {
			let text = await row
				.locator('div.Table-module_flexColumn__KstMu > div')
				.textContent();

			text = text?.trim() ?? null;
			expect(text).toBeTruthy();
		}
	}

	async checkExternalSourceCount() {
		const checkboxes = await this.page
			.locator('div[id="line-chart"] div[role="checkbox"][aria-label]')
			.count();
		expect(checkboxes).toBeLessThanOrEqual(5);
	}

	async checkTooltipSotDonutChartForUpc(
		lastWeekNumberInList: string,
		intervalSrc: string,
		source: string,
		aUpc: string,
		Upcs: string
	) {
		const perfPage = new performancePage(this.page);
		let tooltipDay: string;
		let interval;
		// Fetch start and end dates
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		// Apply filters
		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await perfPage.dateFilterApplyBtnClick();

		// Fetch company ID
		const compnyId = await perfPage.getCompanyId();

		// Go to SOT chart and set display to Daily
		await (await perfPage.seeDetailsLinkSOTChart()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await this.sotTrendsDefaultDlyAllSrcSelection('Daily')).click();
		await (await this.selectDailyWeeklySOTTrend('Daily')).click();

		// Display and interact with tooltips on the chart
		const tooltips = await this.page
			.locator('#line-chart .am5-tooltip-container [role="tooltip"]')
			.all();
		for (const tooltip of tooltips) {
			await tooltip.hover({ force: true });
			const tooltipText = await tooltip.textContent();
			tooltipDay = tooltipText?.substring(0, 6) ?? '';

			// // Set API endpoint and payload
			let url: string;
			if (process.env.ENV === 'PROD') {
				url = sotlineProd;
			} else if (process.env.ENV === 'QA') {
				url = sotlineStg;
			} else {
				url = sotline;
			}

			const luminationToken = await perfPage.getCookie();
			const header = await perfPage.getHeadersAndCookies(luminationToken);

			// Check interval type
			interval = intervalSrc.includes('Daily') ? 'Daily' : 'Weekly';
			const linePayload = perfPage.getsotLinePayloadForUPC(
				dateStart,
				dateEnd,
				aUpc,
				Upcs,
				interval,
				compnyId,
				source
			);

			// Make API request
			const response = await this.page.request.post(url, {
				headers: header,
				data: linePayload
			});
			const responseBody = await response.json();

			// Extract and compare tooltip data
			const pdpCnt = responseBody.find(
				(item: any) => item.position === tooltipDay
			);
			const mobileNonSearchCnt = pdpCnt
				? pdpCnt['Mobile App Non-Search']
				: '-';

			const tooltipCleaned = tooltipText?.replace(',', '');
			expect(tooltipCleaned).toContain(mobileNonSearchCnt);
		}
	}

	async verifyTableHeaders(filter: string) {
		const headers = this.page.locator('table thead th');
		const expectedTexts = [
			filter,
			'Change vs Prev Time Period',
			'PDP Views'
		];

		const headerTexts = [];
		for (let i = 0; i < (await headers.count()); i++) {
			const headerText = await headers.nth(i).textContent();
			headerTexts.push(headerText?.trim() ?? '');
		}

		expect(headerTexts).toEqual(expectedTexts);
	}

	// // check table data with api
	async verifyTableDataWithApi(lastWeekNumberInList: string, aUpc?: string) {
		// Fetch start and end dates
		const perfPage = new performancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		// Apply week filter and date filter
		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await perfPage.dateFilterApplyBtnClick();

		// Item-specific flow
		if (aUpc) {
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(aUpc);
			await (await perfPage.ConfirmBtnUpc()).click();
		} else {
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await this.page.locator('button:has-text("Confirm")').click();
		}

		await (await this.seeDetailsLinkSOTChart()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Set up the menu options based on category or item flow
		await (await perfPage.sotDonutPage.tabelMenuButton()).click();
		const menuOption = aUpc ? 'Item' : 'Category';
		await (
			await perfPage.sotDonutPage.tableMenuFilterSelect(menuOption)
		).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		let url: string;
		if (process.env.ENV === 'PROD') {
			url = tableProd;
		} else if (process.env.ENV === 'QA') {
			url = tableStg;
		} else {
			url = table;
		}

		// Fetch company ID and authentication token
		const compnyId = await perfPage.getCompanyId();
		const luminationToken = await perfPage.getCookie();

		// Set headers and payload
		const header = await perfPage.getHeadersAndCookies(luminationToken);
		let tablePayload;
		if (aUpc) {
			tablePayload = perfPage.getTablePayloadForUpc(
				dateStart,
				dateEnd,
				aUpc,
				compnyId
			);
		} else {
			const categoryNbr = (
				await perfPage.checkSelectedCategoryIsApplied('1')
			).text?.split(' ')[0];
			const dNum = (await perfPage.getDepartmentNumber()).numberExtracted;
			tablePayload = perfPage.getPayloadTable(
				dateStart,
				dateEnd,
				`${dNum}_${categoryNbr}`,
				compnyId
			);
		}

		// Send the API request and validate table data
		const response = await this.page.request.post(url, {
			headers: header,
			data: tablePayload
		});
		const responseBody = await response.json();
		let pdpViewCount = responseBody[0]?.pdpViewCount || '-';

		const cellIndex = aUpc ? 4 : 3;
		const metricsValue = await this.getTableDataValue(cellIndex.toString());
		const pdpValue = metricsValue.text.replace(',', '');

		expect(pdpValue).toContain(pdpViewCount);
	}

	// // validate table data for item with api
	// verifyTableDataWithAPI(url, lastWeekNumberInList, minWaitTime, aUpc) {
	// 	perfPage
	// 		.datesFromFilter(lastWeekNumberInList, minWaitTime)
	// 		.then((dates) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			perfPage.clickWeekFilter(lastWeekNumberInList);
	// 			perfPage.dateFilterApplyBtnClick();
	// 			perfPage
	// 				.checkAndClickOnUpcBtn()
	// 				.click({ timeout: minWaitTime });
	// 			perfPage.pasteUpcs(aUpc);
	// 			perfPage.ConfirmBtnUpc().click();
	// 			cy.wait(minWaitTime);
	// 			this.seeDetailsLinkSOTChart({ timeout: minWaitTime }).click();
	// 			this.tabelMenuButton().click();
	// 			this.tableMenuFilterSelect('Item', { timeout: minWaitTime })
	// 				.should('be.visible')
	// 				.click();
	// 			//click on billboard menu button
	// 			cy.wait(minWaitTime);
	// 			if (
	// 				url == 'https://stg.walmartluminate.com/digitallandscapes/'
	// 			) {
	// 				cy.intercept(table).as('table');
	// 			} else {
	// 				cy.intercept(tableStg).as('table');
	// 			}
	// 			cy.getCompanyId(url).then((cmpanyId) => {
	// 				let compnyId = cmpanyId;
	// 				cy.getCookie('LUMINATE_TOKEN').then((cookie) => {
	// 					const luminationToken = cookie ? cookie.value : null;
	// 					let header = new ApiHeaders().getHeadersAndCookies(
	// 						url,
	// 						luminationToken
	// 					);
	// 					let tablePayload =
	// 						new ApiPayloads().getTablePayloadForUpc(
	// 							dateStart,
	// 							dateEnd,
	// 							aUpc,
	// 							compnyId
	// 						);
	// 					if (
	// 						url ==
	// 						'https://stg.walmartluminate.com/digitallandscapes/'
	// 					) {
	// 						cy.request({
	// 							method: 'POST',
	// 							url: tableStg,
	// 							headers: header,
	// 							body: tablePayload
	// 						}).then((response) => {
	// 							const responseBody = response.body;
	// 							let pdpViewCount = responseBody[0].pdpViewCount;
	// 							if (pdpViewCount === 0) {
	// 								pdpViewCount = '-';
	// 							}
	// 							this.getTableDataValue(4).then(
	// 								(metricsValue) => {
	// 									let value = metricsValue.text;
	// 									value = value.replace(',', '');
	// 									expect(value).to.contain(pdpViewCount);
	// 								}
	// 							);
	// 						});
	// 					} else {
	// 						cy.request({
	// 							method: 'POST',
	// 							url: table,
	// 							headers: header,
	// 							body: tablePayload
	// 						}).then((response) => {
	// 							const responseBody = response.body;
	// 							let pdpViewCount = responseBody[0].pdpViewCount;
	// 							if (pdpViewCount === 0) {
	// 								pdpViewCount = '-';
	// 							}
	// 							this.getTableDataValue(4).then(
	// 								(metricsValue) => {
	// 									let value = metricsValue.text;
	// 									value = value.replace(',', '');
	// 									expect(value).to.contain(pdpViewCount);
	// 								}
	// 							);
	// 						});
	// 					}
	// 				});
	// 			});
	// 		});
	// }

	// // get table value from session conversion Page
	async getTableDataValue(cellNumber: string) {
		const text = await this.donutPageElements
			.tableCell(cellNumber)
			.innerText();

		return { text };
	}

	// //verify tooltip for donut chart for upcs
	async checkTooltipSotDonutChart(
		lastWeekNumberInList: string,
		intervalSrc: string,
		source: string
	) {
		const perfPage = new performancePage(this.page);
		let tooltipDay: string;
		let interval;

		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await perfPage.waitForAPIResponse(donutChart);

		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();
		const departNum = await perfPage.getDepartmentNumber();

		await this.page.locator('button:has-text("Confirm")').click();

		const compnyId = await perfPage.getCompanyId();
		let categoryNbr = category?.text?.split(' ')[0];
		let dNum = departNum.numberExtracted;

		await (await perfPage.seeDetailsLinkSOTChart()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await (await this.sotTrendsDefaultDlyAllSrcSelection('Daily')).click();
		await (await this.selectDailyWeeklySOTTrend('Daily')).click();

		const tooltipContainers = this.page.locator('#line-chart ');
		await tooltipContainers.boundingBox();
		const tooltips = await tooltipContainers.elementHandles();

		for (const tooltipContainer of tooltips) {
			await tooltipContainer.hover({ force: true });

			const tooltipText = await tooltipContainer.innerText();
			let url: string;
			if (process.env.ENV === 'PROD') {
				url = sotlineProd;
			} else if (process.env.ENV === 'QA') {
				url = sotlineStg;
			} else {
				url = sotline;
			}

			const cookie = await perfPage.getCookie();
			const header = await perfPage.getHeadersAndCookies(cookie);

			interval = intervalSrc.includes('Daily') ? 'Daily' : 'Weekly';
			const linePayload = perfPage.getsotLinePayloadForCategory(
				dateStart,
				dateEnd,
				`${dNum}_${categoryNbr}`,
				interval,
				compnyId,
				source
			);

			const response = await this.page.request.post(url, {
				headers: header,
				data: linePayload
			});

			const responseBody = await response.json();
			tooltipDay = tooltipText.substring(0, 8);

			const pdpCnt = responseBody.find(
				(item: any) => item.position === tooltipDay
			);
			const mobileNonSearchCnt = pdpCnt['Mobile App Non-Search'];

			const cleanedTooltipText = tooltipText.replace(',', '');
			expect(cleanedTooltipText).toContain(mobileNonSearchCnt);
		}
	}

	// // check table data with api
	async verifyTableDataWithApiSOT(lastWeekNumberInList: string) {
		const perfPage = new performancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await (await perfPage.verifyDeptAndCatFilter()).click();
		await (await perfPage.checkUncheckADepartment(1)).click();
		await (await perfPage.checkUncheckADepartment(1)).click();
		await this.page.locator('button:has-text("Confirm")').click();

		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();
		const departNum = await perfPage.getDepartmentNumber();

		await this.page.locator('button:has-text("Confirm")').click();

		const compnyId = await perfPage.getCompanyId();
		let categoryNbr = category.text?.split(' ')[0];
		let dNum = departNum.numberExtracted;

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await this.tabelMenuButton()).click();
		await (
			await perfPage.sotDonutPage.tableMenuFilterSelect('All Sources')
		).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		const luminationToken = await perfPage.getCookie();
		const header = await perfPage.getHeadersAndCookies(luminationToken);

		const tablePayload = perfPage.getPayloadTable(
			dateStart,
			dateEnd,
			`${dNum}_${categoryNbr}`,
			compnyId
		);

		let requestUrl;
		if (process.env.ENV === 'PROD') {
			requestUrl = sotTableStg;
		} else if (process.env.ENV === 'QA') {
			requestUrl = sotTableProd;
		} else {
			requestUrl = sotTable;
		}

		const response = await this.page.request.post(requestUrl, {
			headers: header,
			data: tablePayload
		});
		const responseBody = await response.json();
		const pdpViewCount = responseBody[0]?.pdpViewCount || 0;

		const metricsValue = await this.getTableDataValue('3');
		let valueFromTable = metricsValue.text.replace(',', '');

		expect(valueFromTable).toContain(pdpViewCount);
	}

	async verifyToolTipMessage() {
		await this.donutPageElements
			.donutHoverText()
			.hover({ timeout: DEFAULT_TIMEOUT });
		await expect(this.donutPageElements.messageAfterHover()).toBeVisible();
	}

	async verifyToolTipMessageTrendsChart() {
		await this.donutPageElements
			.donutHoverTextTrendChart()
			.hover({ timeout: DEFAULT_TIMEOUT });
		await expect(
			this.donutPageElements.messageAfterHoverTrendChart()
		).toBeVisible();
	}

	async sortingCheckString(columnNum: string) {
		const rows = await this.page.locator('tbody > tr').allTextContents();
		const strings = rows.map((row) =>
			row.trim() === '-' ? 0 : row.trim()
		);
		for (let i = 0; i < strings.length - 1; i++) {
			expect(strings[i] >= strings[i + 1]).toBe(true);
		}
	}

	async clickToSort(filter: string) {
		return this.donutPageElements.sort(filter);
	}

	// Add more methods for other functionalities
}

export default DonutPage;
