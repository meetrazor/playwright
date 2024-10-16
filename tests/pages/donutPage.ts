import { Page, expect } from '@playwright/test';
import { DEFAULT_TIMEOUT as minWaitTime } from '../../config';
import PerformancePage from './performancePage';

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
	// FIXME
	// async checkTooltipSotDonutChartForUpc(
	// 	url: string,
	// 	lastWeekNumberInList: string,
	// 	intervalSrc: number,
	// 	source: string,
	// 	aUpc: string,
	// 	Upcs: string
	// ) {
	// 	let tooltipDay: string;
	// 	let interval;
	// 	const perfPage = new PerformancePage(this.page);
	// 	const dates = await perfPage.datesFromFilter(
	// 		lastWeekNumberInList,
	// 		minWaitTime
	// 	);
	// 	const dateStart = dates.startreversedDateReceived;
	// 	const dateEnd = dates.endreversedDateReceived;

	// 	await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
	// 	await perfPage.dateFilterApplyBtnClick();

	// 	const companyId = await this.page.evaluate(() => {
	// 		return cy.getCompanyId(url).then((cmpanyId) => cmpanyId);
	// 	});

	// 	await (await this.sotTrendsDefaultDlyAllSrcSelection('Daily')).click();
	// 	await (await this.selectDailyWeeklySOTTrend('Daily')).click();
	// 	const tooltipText = await this.page
	// 		.locator(
	// 			'//*[@id="line-chart"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 		)
	// 		.hover()
	// 		.textContent();

	// 	const payload = new ApiPayloads().getsotLinePayloadForUPC(
	// 		dateStart,
	// 		dateEnd,
	// 		aUpc,
	// 		Upcs,
	// 		interval,
	// 		companyId,
	// 		source
	// 	);
	// 	const response = await this.page.request.post(sotlineProd, {
	// 		data: payload
	// 	});
	// 	const responseBody = await response.json();
	// 	const pdpCnt = responseBody.find(
	// 		(item) => item.position === tooltipDay
	// 	);
	// 	expect(tooltipText).toContain(pdpCnt['Mobile App Non-Search']);
	// }
	// verifyTableHeaders(filter) {
	// 	cy.get('table.w_GQ thead th').should(($headers) => {
	// 		// Extract the text content of the headers
	// 		const headerTexts = $headers
	// 			.map((index, header) => Cypress.$(header).text())
	// 			.get();
	// 		// Define the expected text values
	// 		const expectedTexts = [
	// 			filter,
	// 			'Change vs Prev Time Period',
	// 			'PDP Views'
	// 		];
	// 		// Check if the expected text values are present in the headers
	// 		expect(headerTexts).to.deep.equal(expectedTexts);
	// 	});
	// }

	// // check table data with api
	// verifyTableDataWithApi(url, lastWeekNumberInList, minWaitTime) {
	// 	perfPage
	// 		.datesFromFilter(lastWeekNumberInList, minWaitTime)
	// 		.then((dates) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			perfPage.clickWeekFilter(lastWeekNumberInList);
	// 			perfPage.dateFilterApplyBtnClick();
	// 			perfPage
	// 				.verifyDeptAndCatFilter({ timeout: minWaitTime })
	// 				.click();
	// 			perfPage.checkUncheckADepartment(1).click();
	// 			perfPage.checkUncheckADepartment(1).click();
	// 			cy.contains('button', 'Confirm').click();
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
	// 						categoryNbr = categoryNbr.split(' ')[0];
	// 						this.seeDetailsLinkSOTChart({
	// 							timeout: minWaitTime
	// 						}).click();
	// 						// select category option
	// 						cy.wait(minWaitTime);
	// 						sotDonutPage.tabelMenuButton().click();
	// 						sotDonutPage
	// 							.tableMenuFilterSelect('Category')
	// 							.click();
	// 						cy.wait(minWaitTime);
	// 						if (
	// 							url ==
	// 							'https://stg.walmartluminate.com/digitallandscapes/'
	// 						) {
	// 							cy.intercept(tableStg).as('table');
	// 						} else {
	// 							cy.intercept(table).as('table');
	// 						}
	// 						cy.getCookie('LUMINATE_TOKEN').then((cookie) => {
	// 							const luminationToken = cookie
	// 								? cookie.value
	// 								: null;
	// 							let header =
	// 								new ApiHeaders().getHeadersAndCookies(
	// 									url,
	// 									luminationToken
	// 								);
	// 							let tablePayload =
	// 								new ApiPayloads().getPayloadTable(
	// 									dateStart,
	// 									dateEnd,
	// 									dNum + '_' + categoryNbr,
	// 									compnyId
	// 								);
	// 							if (
	// 								url ==
	// 								'https://stg.walmartluminate.com/digitallandscapes/'
	// 							) {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: tableStg,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									let pdpViewCount =
	// 										responseBody[0].pdpViewCount;
	// 									if (pdpViewCount === 0) {
	// 										pdpViewCount = '-';
	// 									}
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											let pdpValue =
	// 												metricsValue.text;
	// 											pdpValue = pdpValue.replace(
	// 												',',
	// 												''
	// 											);
	// 											expect(pdpValue).to.contain(
	// 												pdpViewCount
	// 											);
	// 										}
	// 									);
	// 								});
	// 							} else {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: table,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									let pdpViewCount =
	// 										responseBody[0].pdpViewCount;
	// 									if (pdpViewCount === 0) {
	// 										pdpViewCount = '-';
	// 									}
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											let pdpValue =
	// 												metricsValue.text;
	// 											pdpValue = pdpValue.replace(
	// 												',',
	// 												''
	// 											);
	// 											expect(pdpValue).to.contain(
	// 												pdpViewCount
	// 											);
	// 										}
	// 									);
	// 								});
	// 							}
	// 						});
	// 					});
	// 				});
	// 			});
	// 		});
	// }

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
	// getTableDataValue(cellNumber) {
	// 	return this.donutPageElements
	// 		.tableCell(cellNumber)
	// 		.invoke('text')
	// 		.then((text) => {
	// 			return cy.wrap({ text });
	// 		});
	// }

	// //verify tooltip for donut chart for upcs
	// checkTooltipSotDonutChart(
	// 	url,
	// 	lastWeekNumberInList,
	// 	minWaitTime,
	// 	intervalSrc,
	// 	source
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
	// 			cy.waitForLoadDonutAPI(url);
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
	// 							.seeDetailsLinkSOTChart({
	// 								timeout: minWaitTime
	// 							})
	// 							.click();
	// 						cy.wait(minWaitTime);
	// 						this.sotTrendsDefaultDlyAllSrcSelection(
	// 							'Daily'
	// 						).click();
	// 						this.selectDailyWeeklySOTTrend('Daily').click();
	// 						cy.xpath(
	// 							'//*[@id="line-chart"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).invoke('show');
	// 						cy.xpath(
	// 							'//*[@id="line-chart"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).click({ force: true });
	// 						cy.get('#line-chart .am5-tooltip-container').invoke(
	// 							'show'
	// 						);
	// 						cy.get('#line-chart .am5-tooltip-container').click({
	// 							force: true
	// 						});
	// 						cy.xpath(
	// 							"//div[@id='line-chart']//canvas[@class='am5-layer-30']"
	// 						)
	// 							.invoke('show')
	// 							.click({ force: true });
	// 						cy.get('#line-chart .am5-tooltip-container').each(
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
	// 												if (
	// 													url ==
	// 													'https://stg.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(
	// 														sotlineStg
	// 													).as('sotline');
	// 												} else if (
	// 													url ==
	// 													'https://www.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(
	// 														sotlineProd
	// 													).as('billboard');
	// 												} else {
	// 													cy.intercept(
	// 														sotline
	// 													).as('sotline');
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
	// 																new ApiPayloads().getsotLinePayloadForCategory(
	// 																	dateStart,
	// 																	dateEnd,
	// 																	dNum +
	// 																		'_' +
	// 																		categoryNbr,
	// 																	interval,
	// 																	compnyId,
	// 																	source
	// 																);
	// 															if (
	// 																url ==
	// 																'https://stg.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: sotlineStg,
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let pdpCnt =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let mobileNonSearchCnt =
	// 																			pdpCnt[
	// 																				'Mobile App Non-Search'
	// 																			];
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
	// 																			mobileNonSearchCnt
	// 																		);
	// 																	}
	// 																);
	// 															} else if (
	// 																url ==
	// 																'https://www.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: sotlineProd,
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let pdpCnt =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let mobileNonSearchCnt =
	// 																			pdpCnt[
	// 																				'Mobile App Non-Search'
	// 																			];
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
	// 																			mobileNonSearchCnt
	// 																		);
	// 																	}
	// 																);
	// 															} else {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: sotline,
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let pdpCnt =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		let mobileNonSearchCnt =
	// 																			pdpCnt[
	// 																				'Mobile App Non-Search'
	// 																			];
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
	// 																			mobileNonSearchCnt
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

	// // check table data with api
	// verifyTableDataWithApiSOT(url, lastWeekNumberInList, minWaitTime) {
	// 	perfPage
	// 		.datesFromFilter(lastWeekNumberInList, minWaitTime)
	// 		.then((dates) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			perfPage.clickWeekFilter(lastWeekNumberInList);
	// 			cy.wait(minWaitTime);
	// 			perfPage.dateFilterApplyBtnClick();
	// 			perfPage
	// 				.verifyDeptAndCatFilter({ timeout: minWaitTime })
	// 				.click();
	// 			perfPage.checkUncheckADepartment(1).click();
	// 			perfPage.checkUncheckADepartment(1).click();
	// 			cy.contains('button', 'Confirm').click();
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
	// 						categoryNbr = categoryNbr.split(' ')[0];
	// 						cy.wait(minWaitTime);
	// 						sotDonutPage.tabelMenuButton().click();
	// 						sotDonutPage
	// 							.tableMenuFilterSelect('All Sources')
	// 							.click();
	// 						cy.wait(minWaitTime);
	// 						if (
	// 							url ==
	// 							'https://stg.walmartluminate.com/digitallandscapes/'
	// 						) {
	// 							cy.intercept(sotTableStg).as('table');
	// 						} else if (
	// 							url ==
	// 							'https://www.walmartluminate.com/digitallandscapes/'
	// 						) {
	// 							cy.intercept(sotTableProd).as('table');
	// 						} else {
	// 							cy.intercept(sotTable).as('table');
	// 						}
	// 						cy.getCookie('LUMINATE_TOKEN').then((cookie) => {
	// 							const luminationToken = cookie
	// 								? cookie.value
	// 								: null;
	// 							let header =
	// 								new ApiHeaders().getHeadersAndCookies(
	// 									url,
	// 									luminationToken
	// 								);
	// 							let tablePayload =
	// 								new ApiPayloads().getPayloadTable(
	// 									dateStart,
	// 									dateEnd,
	// 									dNum + '_' + categoryNbr,
	// 									compnyId
	// 								);
	// 							if (
	// 								url ==
	// 								'https://stg.walmartluminate.com/digitallandscapes/'
	// 							) {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: sotTableStg,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									const pdp = responseBody[0];
	// 									const pdpViewCount = pdp.pdpViewCount;
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											let valueFromTable =
	// 												metricsValue.text;
	// 											valueFromTable =
	// 												valueFromTable.replace(
	// 													',',
	// 													''
	// 												);
	// 											expect(
	// 												valueFromTable
	// 											).to.contain(pdpViewCount);
	// 										}
	// 									);
	// 								});
	// 							} else if (
	// 								url ==
	// 								'https://www.walmartluminate.com/digitallandscapes/'
	// 							) {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: sotTableProd,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									const pdp = responseBody[0];
	// 									const pdpViewCount = pdp.pdpViewCount;
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											let valueFromTable =
	// 												metricsValue.text;
	// 											valueFromTable =
	// 												valueFromTable.replace(
	// 													',',
	// 													''
	// 												);
	// 											expect(
	// 												valueFromTable
	// 											).to.contain(pdpViewCount);
	// 										}
	// 									);
	// 								});
	// 							} else {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: sotTable,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									const pdp = responseBody[0];
	// 									const pdpViewCount = pdp.pdpViewCount;
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											let valueFromTable =
	// 												metricsValue.text;
	// 											valueFromTable =
	// 												valueFromTable.replace(
	// 													',',
	// 													''
	// 												);
	// 											expect(
	// 												valueFromTable
	// 											).to.contain(pdpViewCount);
	// 										}
	// 									);
	// 								});
	// 							}
	// 						});
	// 					});
	// 				});
	// 			});
	// 		});
	// }

	async verifyToolTipMessage(minWaitTime: number) {
		await this.donutPageElements
			.donutHoverText()
			.hover({ timeout: minWaitTime });
		await expect(this.donutPageElements.messageAfterHover()).toBeVisible();
	}

	async verifyToolTipMessageTrendsChart(minWaitTime: number) {
		await this.donutPageElements
			.donutHoverTextTrendChart()
			.hover({ timeout: minWaitTime });
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
