import { expect, Page } from '@playwright/test';
import PerformancePage from './performancePage';
import { DEFAULT_TIMEOUT } from '../../config';
import {
	line,
	lineProd,
	lineStg,
	sessionshare,
	sessionshareProd,
	sessionshareStg,
	table,
	tableProd,
	tableStg
} from '../../shared/routes';
import performancePage from './performancePage';

class SessionSharePage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	// Session Share Page Elements
	sessionSharePageElements = {
		toolTipSessionShare: () =>
			this.page.locator(
				'//div[@id="bar-chart-container"]//div[@role="tooltip"]'
			),
		legendsBelowBarChart: (legend: string) =>
			this.page.locator(
				`//div[@id='bar-chart-container']//div[contains(@aria-label, '${legend}')]`
			),
		sessionShareChart: () =>
			this.page.locator('div[id="bar-chart-container"]'),
		sessionSharePageText: (text: string) =>
			this.page.locator(
				`//div[@title='${text}']//span[text()='${text}']`
			),
		sessionSharePagePathLinkText: (text: string) =>
			this.page.locator(`//a//span[text()='${text}']`),
		sessionShareDropdown: (filter: string) =>
			this.page.locator(
				`//div[@class='wgvDhe2c4O5T6udjdLoZ']//button[text()='${filter}']`
			),
		sessionShareMenuItm: (filter: string) =>
			this.page.locator(`//button//span[text()='${filter}']`),
		sessionShareTrend: () => this.page.locator('div[id="csos-trend"]'),
		dailyWeeklyDrpDown: () =>
			this.page.locator(
				"//div[@class='w_HK w_Bm']//button[@data-test-cy='Daily-btn']"
			),
		dailyWeeklyMenuSelection: (dailyWeeklyFilter: string) =>
			this.page.locator(
				`//button[@role="menuitem"]//span[text()='${dailyWeeklyFilter}']`
			),
		sessionShareTrendChartLegends: (metricsName: string) =>
			this.page.locator(`div[aria-label*='${metricsName}']`),
		tabelCell: (cellNumber: string) =>
			this.page.locator(
				`//tr[@class='w_Gp']/td[${cellNumber}]/span/div/div`
			),
		tableData: (cellNumber: string) =>
			this.page.locator(
				`//tr[@class='w_Gp']/td[${cellNumber}]/span/span`
			),
		tableFilter: () =>
			this.page.locator(
				"//button[@data-test-cy='Item-value' or @data-test-cy='Category-value']"
			),
		tableFilterMenu: () => this.page.locator('.w_FZ[role="menu"]'),
		tableFilterMenuBtn: () =>
			this.page.locator('.w_FZ[role="menu"] button'),
		selectTableFiltr: (filter: string) =>
			this.page.locator(
				`//div[@id='menuListScrollableDiv']//button//span[text()='${filter}']`
			),
		tableRowXpath: () =>
			this.page.locator(
				'td.w_GZ.w_Ga.Table-module_fixedColumnBody__HBTQc'
			),
		noDataInTable: () =>
			this.page.locator('//span[text()="There is no data to display"]'),
		sort: (filter: string) =>
			this.page.locator(`//button//span[text()='${filter}']`),
		sessionHoverText: () =>
			this.page.locator("//h4[text()='Session Share']"),
		messageAfterHover: () =>
			this.page.locator(
				"//p[text()='Your share of sessions compared against other products in the selected category.']"
			),
		sessionTrendHoverText: () =>
			this.page.locator("//h4[text()='Session Share Trend']"),
		trendMessageAfterHover: () =>
			this.page.locator(
				"//p[text()='Engagement trends based on the total share of sessions for your selected products over the specified date range compared to the category.']"
			)
	};

	// Methods
	async sessionshareChartPresence() {
		return this.sessionSharePageElements.sessionShareChart();
	}

	async sessionsharePageText(text: string) {
		return this.sessionSharePageElements.sessionSharePageText(text);
	}

	async sessionsharePagePathLinkText(text: string) {
		return this.sessionSharePageElements.sessionSharePagePathLinkText(text);
	}

	async tooltipsessionShare() {
		return this.sessionSharePageElements.toolTipSessionShare();
	}

	async checkLegendsBelowBarChart(legend: string) {
		return this.sessionSharePageElements.legendsBelowBarChart(legend);
	}

	async sessionShareDropdown(filter: string) {
		return this.sessionSharePageElements.sessionShareDropdown(filter);
	}

	async verifyToolTipMessage() {
		await this.sessionSharePageElements.sessionHoverText().hover();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await expect(
			this.sessionSharePageElements.messageAfterHover()
		).toBeVisible();
	}

	async verifyShareTrendToolTipMessage() {
		await this.sessionSharePageElements.sessionTrendHoverText().hover();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await expect(
			this.sessionSharePageElements.trendMessageAfterHover()
		).toBeVisible();
	}

	async selectMenu(filter: string) {
		return this.sessionSharePageElements.sessionShareMenuItm(filter);
	}

	async checkSessionShareTrendChart() {
		return this.sessionSharePageElements.sessionShareTrend();
	}

	async dlyWklyDrpDwnFromSessnShareTrendChart() {
		return this.sessionSharePageElements.dailyWeeklyDrpDown();
	}

	async dailyWeeklyFromSessionShareTrend(dailyWeeklyFilter: string) {
		return this.sessionSharePageElements.dailyWeeklyMenuSelection(
			dailyWeeklyFilter
		);
	}

	async checkSessionShareTrendChartFields(metricsName: string) {
		return this.sessionSharePageElements.sessionShareTrendChartLegends(
			metricsName
		);
	}

	async checkTooltipsWithApi(lastWeekNumberInList: string) {
		// Get date range from the filter
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		// Interact with the week number list and apply date filter
		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await (await perfPage.verifyDeptAndCatFilter()).click();

		// Toggle department selection
		await (await perfPage.checkUncheckADepartment(1)).click();
		await (await perfPage.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();

		// Get the selected category and department number
		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();
		const departNum = await perfPage.getDepartmentNumber();
		const cmpanyIdReceived = await perfPage.getCompanyId();

		// Extract category and department numbers
		let categoryNbr = category?.text?.split(' ')[0];
		const departNumber = departNum.numberExtracted;

		// Trigger hover action on the bar chart
		await this.page
			.locator("//div[@id='bar-chart-container']//div[@role='button']")
			.hover({ force: true });
		await this.page
			.locator("//div[@id='bar-chart-container']//div[@role='button']")
			.click({ force: true });

		// Log the hover action and trigger tooltip
		await this.page.locator('#bar-chart-container').hover({ force: true });
		const tooltipText = await this.page
			.locator(
				'#bar-chart-container .am5-tooltip-container div[role="tooltip"]'
			)
			.textContent();

		await this.page.waitForTimeout(4000);

		// Interact with the alert and canvas elements
		await this.page
			.locator('//div[@id="bar-chart-container"]//div[@role="alert"]')
			.hover({ force: true });
		await this.page
			.locator('//div[@id="bar-chart-container"]//div[@role="alert"]')
			.click({ force: true });
		await this.page
			.locator(
				"//div[@id='bar-chart-container']//canvas[@class='am5-layer-30']"
			)
			.hover({ force: true });
		await this.page
			.locator(
				"//div[@id='bar-chart-container']//canvas[@class='am5-layer-30']"
			)
			.click({ force: true });

		// API request interception logic based on environment
		let apiEndpoint;
		if (process.env.ENV === 'QA') {
			apiEndpoint = sessionshareStg;
		} else if (process.env.ENV === 'PROD') {
			apiEndpoint = sessionshareProd;
		} else {
			apiEndpoint = sessionshare;
		}

		// Get authentication token and set headers
		const cookieString = await perfPage.getCookie();
		const headers = await perfPage.getHeadersAndCookies(cookieString);

		// Prepare the API payload
		const ssPayload = perfPage.getPayloadBillboardTerm(
			dateStart,
			dateEnd,
			`${departNumber}_${categoryNbr}`,
			cmpanyIdReceived
		);

		// Make API request based on the environment
		const response = await this.page.request.post(apiEndpoint, {
			headers: headers,
			data: ssPayload
		});
		const responseBody = await response.json();
		const pdpSessionShareValue =
			responseBody[0].pdp_session_share.toString();

		// Return the tooltip text and session share value
		return {
			tooltipText: tooltipText?.toString(),
			pdpSessionShareValue
		};
	}

	// FIXME

	//verify tooltip for session conversion chart
	// checkTooltipSessionShareChart(
	// 	url,
	// 	lastWeekNumberInList,
	// 	minWaitTime,
	// 	intervalSrc
	// ) {
	// 	let tooltipDay;
	// 	let interval;
	// 	perfPage
	// 		.datesFromFilter(lastWeekNumberInList, minWaitTime)
	// 		.then((dates) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
	// 			cy.wait(minWaitTime);
	// 			perfPage.dateFilterApplyBtnClick();
	// 			perfPage.checkSelectedCategoryIsApplied(1).then((category) => {
	// 				perfPage
	// 					.verifyDeptAndCatFilter({ timeout: minWaitTime })
	// 					.click();
	// 				perfPage.getDepartmentNumber().then((departNum) => {
	// 					cy.contains('button', 'Confirm').click();
	// 					cy.getCompanyId(url).then((cmpanyId) => {
	// 						let compnyId = cmpanyId;
	// 						let categoryNbr = category.text;
	// 						let dNum = departNum.numberExtracted;
	// 						perfPage
	// 							.seeDetailsLinkSessionShareChart({
	// 								timeout: minWaitTime
	// 							})
	// 							.click();
	// 						this.dlyWklyDrpDwnFromSessnShareTrendChart({
	// 							timeout: minWaitTime
	// 						}).click();
	// 						this.dailyWeeklyFromSessionShareTrend(
	// 							'Daily'
	// 						).click();
	// 						cy.wait(minWaitTime);
	// 						cy.xpath(
	// 							'//*[@id="csos-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).invoke('show');
	// 						cy.xpath(
	// 							'//*[@id="csos-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).click({ force: true });
	// 						cy.get('#csos-trend .am5-tooltip-container').invoke(
	// 							'show'
	// 						);
	// 						cy.get('#csos-trend .am5-tooltip-container').click({
	// 							force: true
	// 						});
	// 						cy.xpath(
	// 							"//div[@id='csos-trend']//canvas[@class='am5-layer-30']"
	// 						)
	// 							.invoke('show')
	// 							.click({ force: true });
	// 						cy.get('#csos-trend .am5-tooltip-container').each(
	// 							($tooltipContainer, index) => {
	// 								cy.wrap($tooltipContainer)
	// 									.find('[role="tooltip"]')
	// 									.eq(index)
	// 									.invoke('mouseover')
	// 									.then(() => {
	// 										cy.wrap($tooltipContainer)
	// 											.find('[role="tooltip"]')
	// 											.eq(index)
	// 											.invoke('text')
	// 											.then((tooltipText) => {
	// 												cy.wait(minWaitTime);
	// 												if (
	// 													url ==
	// 													'https://stg.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(
	// 														lineStg
	// 													).as('line');
	// 												} else if (
	// 													url ==
	// 													'https://dev.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(line).as(
	// 														'line'
	// 													);
	// 												}
	// 												cy.getCookie(
	// 													'LUMINATE_TOKEN'
	// 												).then((cookie) => {
	// 													const luminationToken =
	// 														cookie
	// 															? cookie.value
	// 															: null;
	// 													let header =
	// 														new ApiHeaders().getHeadersAndCookies(
	// 															url,
	// 															luminationToken
	// 														);
	// 													categoryNbr =
	// 														categoryNbr.split(
	// 															' '
	// 														)[0];
	// 													let startDate =
	// 														new Date(dateStart);
	// 													let endDate = new Date(
	// 														dateEnd
	// 													);
	// 													cy.oneDayPreviousDate(
	// 														startDate,
	// 														endDate
	// 													).then(
	// 														(datenumeric) => {
	// 															tooltipDay =
	// 																tooltipText.substring(
	// 																	0,
	// 																	6
	// 																);
	// 															if (
	// 																intervalSrc.includes(
	// 																	'Daily'
	// 																)
	// 															) {
	// 																interval =
	// 																	'Daily';
	// 															} else {
	// 																interval =
	// 																	'Weekly';
	// 															}
	// 															let linePayload =
	// 																new ApiPayloads().getLinePayloadForCategory(
	// 																	dateStart,
	// 																	dateEnd,
	// 																	dNum +
	// 																		'_' +
	// 																		categoryNbr,
	// 																	interval,
	// 																	compnyId
	// 																);
	// 															if (
	// 																url ==
	// 																'https://stg.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: lineStg,
	// 																	headers:
	// 																		header,
	// 																	body: linePayload
	// 																}).then(
	// 																	(
	// 																		response
	// 																	) => {
	// 																		tooltipDay =
	// 																			tooltipText.substring(
	// 																				0,
	// 																				6
	// 																			);
	// 																		const sessionSharePdpValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionSharePdpViewValueReceived =
	// 																			sessionSharePdpValue.pdpSessionShare;
	// 																		sessionSharePdpViewValueReceived =
	// 																			sessionSharePdpViewValueReceived.toString();
	// 																		tooltipText =
	// 																			tooltipText.toString();
	// 																		tooltipText =
	// 																			tooltipText.replace(
	// 																				',',
	// 																				''
	// 																			);
	// 																		expect(
	// 																			tooltipText
	// 																		).contains(
	// 																			sessionSharePdpViewValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															} else if (
	// 																url ==
	// 																'https://stg.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: line,
	// 																	headers:
	// 																		header,
	// 																	body: linePayload
	// 																}).then(
	// 																	(
	// 																		response
	// 																	) => {
	// 																		tooltipDay =
	// 																			tooltipText.substring(
	// 																				0,
	// 																				6
	// 																			);
	// 																		const sessionSharePdpValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionSharePdpViewValueReceived =
	// 																			sessionSharePdpValue.pdpSessionShare;
	// 																		sessionSharePdpViewValueReceived =
	// 																			sessionSharePdpViewValueReceived.toString();
	// 																		tooltipText =
	// 																			tooltipText.toString();
	// 																		tooltipText =
	// 																			tooltipText.replace(
	// 																				',',
	// 																				''
	// 																			);
	// 																		expect(
	// 																			tooltipText
	// 																		).contains(
	// 																			sessionSharePdpViewValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															}
	// 														}
	// 													);
	// 												});
	// 											});
	// 									});
	// 							}
	// 						);
	// 					});
	// 				});
	// 			});
	// 		});
	// }
	async checkTooltipSessionShareChart(
		lastWeekNumberInList: string,
		intervalSrc: string
	) {
		let tooltipDay: string;
		let interval: string;
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await perfPage.dateFilterApplyBtnClick();
		await (await perfPage.verifyDeptAndCatFilter()).click();
		await (await perfPage.checkUncheckADepartment(1)).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.checkUncheckADepartment(1)).click();
		await perfPage.performanceElements.selectCustomCategory(2).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		const category = await perfPage.checkSelectedCategoryIsApplied('2');
		(await perfPage.verifyDeptAndCatFilter()).click();
		const departNum = await perfPage.getDepartmentNumber();

		await this.page.locator('button', { hasText: 'Confirm' }).click();

		const cmpanyId = await perfPage.getCompanyId();
		let compnyId = cmpanyId;
		let categoryNbr = category.text?.trim().split(' ')[0];
		let dNum = departNum.numberExtracted;

		(await perfPage.seeDetailsLinkSessionShareChart()).click();
		await this.dlyWklyDrpDwnFromSessnShareTrendChart();
		await this.dailyWeeklyFromSessionShareTrend('Daily');

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await this.page
			.locator('#csos-trend')
			.boundingBox()
		await this.page
			.locator('#csos-trend')
			.first()
			.hover({ force: true });
		await this.page
			.locator('#csos-trend ')
			.first()
			.click({ force: true });

		const tooltips = await this.page
			.locator('#csos-trend .am5-tooltip-container')
			.all();

		const cookieString = await perfPage.getCookie();
		const header = await perfPage.getHeadersAndCookiesWithRefer(cookieString);

		for (const [index, tooltipContainer] of tooltips.entries()) {
			const tooltipText = await tooltipContainer
				.locator('[role="tooltip"]')
				.nth(index)
				.innerText();
			await this.page.waitForTimeout(DEFAULT_TIMEOUT);

			tooltipDay = tooltipText.substring(0, 8);
			interval = intervalSrc.includes('Daily') ? 'Daily' : 'Weekly';
			const linePayload = perfPage.getLinePayloadForCategory(
				dateStart,
				dateEnd,
				`${dNum}_${categoryNbr}`,
				interval,
				compnyId
			);

			let lineUrl = '';
			if (process.env.ENV === 'QA') {
				lineUrl = lineStg;
			} else if (process.env.ENV === 'PROD') {
				lineUrl = lineProd;
			} else {
				lineUrl = line;
			}

			const response = await this.page.request.post(lineUrl, {
				headers: header,
				data: linePayload
			});

			const responseBody = await response.json();
		
			const sessionSharePdpValue = responseBody.find(
				(item: any) => item.position === tooltipDay
			);

			let sessionSharePdpViewValueReceived =
				sessionSharePdpValue.pdp_session_share.toString();
			let tooltipValue = tooltipText.toString().replace(',', '');

			expect(tooltipValue).toContain(sessionSharePdpViewValueReceived);
		}
	}

	async verifyTableHeaders(filter: string) {
		const headers = await this.page.$$eval('table.w_GQ thead th', (ths) =>
			ths.map((th) => th?.textContent?.trim())
		);

		if (filter === 'Item') {
			const expectedTexts = [
				filter,
				'Description',
				'Change vs Prev Time Period',
				'PDP View Session Share',
				'Change vs Prev Time Period',
				'Add to Cart Session Share',
				'Change vs Prev Time Period',
				'Purchase Session Share'
			];
			expect(headers).toEqual(expectedTexts);
		} else {
			const expectedTexts = [
				filter,
				'Change vs Prev Time Period',
				'PDP View Session Share',
				'Change vs Prev Time Period',
				'Add to Cart Session Share',
				'Change vs Prev Time Period',
				'Purchase Session Share'
			];
			expect(headers).toEqual(expectedTexts);
		}
	}

	// // no data in table when category/brand selected for upc
	noDataTextTable() {
		this.sessionSharePageElements.noDataInTable();
	}

	async getTableLabelValue(cellNumber: string) {
		const text = await this.sessionSharePageElements
			.tabelCell(cellNumber)
			.textContent();
		return { text };
	}

	async tableFilterButton() {
		return this.sessionSharePageElements.tableFilter();
	}

	async SelectFilterInTable(filter: string) {
		return this.sessionSharePageElements.selectTableFiltr(filter);
	}

	async clickToSort(filter: string) {
		return this.sessionSharePageElements.sort(filter);
	}

	async checkDataInTableRows() {
		const rows = await this.sessionSharePageElements
			.tableRowXpath()
			.allTextContents();
		rows.forEach((text) => expect(text).not.toBe(''));
	}

	async checkTableFilter() {
		await expect(
			this.sessionSharePageElements.tableFilterMenu()
		).toBeVisible();
		const buttons = await this.sessionSharePageElements
			.tableFilterMenuBtn()
			.allTextContents();
		expect(buttons).toContain('Item');
	}
	// FIXME:
	async verifySessionShareTableWithApi(lastWeekNumberInList: string) {
		const perfPage = new performancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await perfPage.dateFilterApplyBtnClick();
		await (await perfPage.verifyDeptAndCatFilter()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await (await perfPage.checkUncheckADepartment(1)).click();
		await (await perfPage.checkUncheckADepartment(1)).click();

		await this.page.locator('button:has-text("Confirm")').click();

		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();

		const departNum = await perfPage.getDepartmentNumber();
		await this.page.locator('button:has-text("Confirm")').click();

		const cmpanyId = await perfPage.getCompanyId();
		const dNum = departNum.numberExtracted;
		let categoryNbr = category?.text?.split(' ')[0];

		await (await perfPage.seeDetailsLinkSessionShareChart()).click();

		let tableUrl = '';
		if (process.env.ENV === 'QA') {
			tableUrl = tableStg;
		} else if (process.env.ENV === 'PROD') {
			tableUrl = tableProd;
		} else {
			tableUrl = table;
		}

		const cookieString = await perfPage.getCookie();

		const header = await perfPage.getHeadersAndCookies(cookieString);
		const tablePayload = perfPage.getPayloadTable(
			dateStart,
			dateEnd,
			`${dNum}_${categoryNbr}`,
			cmpanyId
		);

		const response = await this.page.request.post(tableUrl, {
			headers: header,
			data: tablePayload
		});

		const responseBody = await response.json();
	
		let pdpSessionShare = responseBody[0].pdp_session_share;
		if (pdpSessionShare === 0) {
			pdpSessionShare = '-';
		}

		const metricsValue = await this.getTableDataValue('4');
		expect(metricsValue.text).toContain(pdpSessionShare.toString());
	}
	async verifyTableDataWithAPI(lastWeekNumberInList: string, aUpc: string) {
		const perfPage = new performancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await perfPage.dateFilterApplyBtnClick();
		await (await perfPage.checkAndClickOnUpcBtn()).click();
		await perfPage.pasteUpcs(aUpc);
		await (await perfPage.ConfirmBtnUpc()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await (await perfPage.seeDetailsLinkSessionShareChart()).click();
		await (await this.tableFilterButton()).click();
		await (await this.SelectFilterInTable('Item')).click();

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		let tableUrl = '';
		if (process.env.ENV === 'QA') {
			tableUrl = tableStg;
		} else if (process.env.ENV === 'PROD') {
			tableUrl = tableProd;
		} else {
			tableUrl = table;
		}

		const cmpanyId = await perfPage.getCompanyId();
		const cookieString = await perfPage.getCookie();

		const header = await perfPage.getHeadersAndCookies(cookieString);
		const tablePayload = perfPage.getTablePayloadForUpc(
			dateStart,
			dateEnd,
			aUpc,
			cmpanyId
		);

		const response = await this.page.request.post(tableUrl, {
			headers: header,
			data: tablePayload
		});

		const responseBody = await response.json();
		let pdpSessionShare = responseBody[0].pdp_session_share;
		if (pdpSessionShare === 0) {
			pdpSessionShare = '-';
		}

		const metricsValue = await this.getTableDataValue('4');
		expect(metricsValue.text).toContain(pdpSessionShare.toString());
	}

	async getTableDataValue(cellNumber: string) {
		const text = await this.sessionSharePageElements
			.tableData(cellNumber)
			.textContent();
		return { text };
	}
}

export default SessionSharePage;
