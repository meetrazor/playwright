import { expect, Page } from '@playwright/test';

class SessionConversionPage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}
	sessionConversionPageElements = {
		// visibility of session conversion chart
		ConversionChartMetrics1: () =>
			this.page.locator(
				"//span[text()='Session PDP View Rate (%)' and @class='w_DY w_Dc w_Dd']"
			),
		ConversionChartMetrics2: () =>
			this.page.locator(
				"//span[text()='Session Add to Cart Rate (%)' and @class='w_DY w_Dc w_Dd']"
			),
		ConversionChartMetrics3: () =>
			this.page.locator(
				"//span[text()='Session Purchase Rate (%)' and @class='w_DY w_Dc w_Dd']"
			),

		// xpath of session conversion page
		SessionOfConversionPageXpath: () =>
			this.page.locator("//div[@title='Conversion']//span"),

		// xpath of redirection link
		redirectToPageLink: (page: string) =>
			this.page.locator(`//span[text()='${page}']`),

		// xpath of daily/weekly dropdown
		dailyWeeklyDropdown: () =>
			this.page.locator(
				"//div[@class='yJfHlxanVK_9sqvre0jL']//button[@data-test-cy='Daily-btn']"
			),

		// xpath of session conversion chart
		sessionConvChart: () => this.page.locator('div[id="soc-trend"]'),

		// xpath of daily/weekly menu
		dailyWeeklyMenu: (dailyWeeklyFilter: string) =>
			this.page.locator(
				`//button[@role="menuitem"]//span[text()='${dailyWeeklyFilter}']`
			),

		// xpath of session conversion trend chart legends
		sessionCoversionTrendChartLegend: (metricsName: string) =>
			this.page.locator(`div[aria-label*="${metricsName}"]`),

		// xpath of session conversion count text
		sessionConvCountText: () =>
			this.page.locator('//h4[text()="Conversion Count Trend"]'),

		// xpath of session conversion count chart
		sessionConvCountChart: () => this.page.locator('div[id="soc-count"]'),

		// xpath of session conversion count chart legend
		sessionCountChartLegend: (metricsName: string) =>
			this.page.locator(`div[aria-label*="${metricsName}"]`),

		// xpath of table headers
		tableHeaders: () => this.page.locator('table.w_GQ thead th'),

		// xpath of table filter
		tableFilter: () =>
			this.page.locator(
				"div[class='vKsPQfia2R0r5RhU3CDA fb8nbRMKegEQNa82djm9'] div[class='w_HK w_Bm'] button[class='Chip-module_chip__3f0zv Chip-module_small__GfjIC']"
			),

		// xpath of table filter menu
		tableFilterMenu: () => this.page.locator('.w_FZ[role="menu"]'),

		// xpath of table filter menu button
		tableFilterMenuBtn: () =>
			this.page.locator('.w_FZ[role="menu"] button'),

		// xpath of session conversion see details link
		seeDetailsLink: () =>
			this.page.locator("//a[@href='/digitallandscapes/conversion']"),

		// xpath to select table filter
		selectTableFiltr: (filter: string) =>
			this.page.locator(
				`//div[@id='menuListScrollableDiv']//button//span[text()='${filter}']`
			),

		// xpath of table column
		tableColumnXpath: (cellNumber: string) =>
			this.page.locator(
				`//tr[@class='w_Gp']/td[${cellNumber}]/span/div/div`
			),

		// xpath for table rows
		tableRowXpath: () =>
			this.page.locator(
				'td.w_GZ.w_Ga.Table-module_fixedColumnBody__HBTQc'
			),

		// xpath of count chart daily weekly dropdown
		dailyWklyDropDown: () =>
			this.page.locator(
				"//div[@class='L5JXEJuDklF5n46Kw5tX']//button[@data-test-cy='Daily-btn']"
			),

		// xpath for no data from table
		noDataTable: () =>
			this.page.locator('//span[text()="There is no data to display"]'),

		// xpath for conversions tooltip
		getAnyMetricsValueForConversionFromchart: (
			metricsPositionInUI: string
		) =>
			this.page.locator(
				`//div[@class='uS8I9PrbyA_xw5sC54Po']//div[@class='Z5oOKSC8c29pOy82KGV5 iPrpYAffZ3H_I343AOET'][${metricsPositionInUI}]//span[@class='w_D6 w_D8 w_EB'][1]`
			),

		// xpath of table cell
		tableCell: (cellNumber: string) =>
			this.page.locator(
				`//tr[@class='w_Gp']/td[${cellNumber}]/span/span`
			),

		// xpath of sort icon
		sort: (filter: string) =>
			this.page.locator(`//button//span[text()='${filter}']`),

		// donut hover text
		conversionHoverText: () =>
			this.page.locator("//h4[text()='Session Conversion']"),

		// textMessageAfterHover
		messageAfterHover: () =>
			this.page.locator(
				"//p[text()='Path to conversion beginning with session with product views.']"
			),

		// conversion trend hover text
		conversionTrendHoverText: () =>
			this.page.locator("//h4[text()='Session Conversion Trend']"),

		// textMessageAfterHover
		TrendmessageAfterHover: () =>
			this.page.locator(
				"//p[text()='Session conversion rate trends over time.']"
			),

		// conversion count hover text
		conversionCountHoverText: () =>
			this.page.locator("//h4[text()='Conversion Count Trend']"),

		// textMessageAfterHover
		countMessageAfterHover: () =>
			this.page.locator(
				"//p[text()='Conversion count trends over time.']"
			)
	};

	// session conversion chart visibility
	async sessionConversionChart() {
		return this.sessionConversionPageElements.ConversionChartMetrics1();
	}

	// session of conversion page
	async SessionOfConversionPage() {
		return this.sessionConversionPageElements.SessionOfConversionPageXpath();
	}

	// path to redirect different pages
	async redirectToPages(pageName: string) {
		return this.sessionConversionPageElements.redirectToPageLink(pageName);
	}

	// days/week dropdown conversionTrend chart
	async dlyWklyDrpDwn() {
		return this.sessionConversionPageElements.dailyWeeklyDropdown();
	}

	// visibility of session conversion trends chart
	async checkSessionConversionChart() {
		return this.sessionConversionPageElements.sessionConvChart();
	}

	// select daily/weekly
	async dailyWeeklyFromSessionConversionTrend(dailyWeeklyFilter: string) {
		return this.sessionConversionPageElements.dailyWeeklyMenu(
			dailyWeeklyFilter
		);
	}

	// verify session conversion trends chart has 3 fields: sessionPdpViewRate, sessionAtcRate, sessionPurchaseConversion
	async checkConversionTrendChartFields(metricsName: string) {
		return this.sessionConversionPageElements.sessionCoversionTrendChartLegend(
			metricsName
		);
	}

	// visibility of session conversion count
	async checkSessionConversionCountText() {
		return this.sessionConversionPageElements.sessionConvCountText();
	}

	// verify visibility of checkSessionConversionCountChart
	async checkSessionConversionCountChart() {
		return this.sessionConversionPageElements.sessionConvCountChart();
	}

	// verify session conversion count chart has 3 fields
	async checkConversionCountChartFields(metricsName: string) {
		return this.sessionConversionPageElements.sessionCountChartLegend(
			metricsName
		);
	}

	// verify tooltip message
	async verifyToolTipMessage(minWaitTime: number) {
		await this.sessionConversionPageElements.conversionHoverText().hover();
		await this.page.waitForTimeout(minWaitTime);
		await expect(
			this.sessionConversionPageElements.messageAfterHover()
		).toBeVisible();
	}

	// verify tooltip for session conversion trend message
	async verifyToolTipSessionConvTrendMessage(minWaitTime: number) {
		await this.sessionConversionPageElements
			.conversionTrendHoverText()
			.hover();
		await this.page.waitForTimeout(minWaitTime);
		await expect(
			this.sessionConversionPageElements.TrendmessageAfterHover()
		).toBeVisible();
	}

	// verify tooltip message for conversion count chart
	async verifyToolTipSessionConvCountMessage(minWaitTime: number) {
		await this.sessionConversionPageElements
			.conversionCountHoverText()
			.hover();
		await this.page.waitForTimeout(minWaitTime);
		await expect(
			this.sessionConversionPageElements.countMessageAfterHover()
		).toBeVisible();
	}

	// click to sort
	async clickToSort(filter: string) {
		return this.sessionConversionPageElements.sort(filter);
	}

	// FIXME
	//perform sort check upc
	// sortingCheck() {
	// 	cy.get('table').within(() => {
	// 		cy.get('tbody > tr').then((rows) => {
	// 			const num = [];
	// 			rows.each((index, row) => {
	// 				cy.wrap(row)
	// 					.find('td:first')
	// 					.invoke('text')
	// 					.then((text) => {
	// 						num.push(parseInt(text, 10));
	// 					});
	// 			});

	// 			cy.wrap(num).then((parseNum) => {
	// 				for (let i = 0; i < parseNum.length - 1; i++) {
	// 					let secondNum = parseInt(parseNum[i + 1]);
	// 					let firstNum = parseInt(parseNum[i]);
	// 					expect(firstNum).to.be.at.most(secondNum);
	// 				}
	// 			});
	// 		});
	// 	});
	// }

	// //perform sort string
	// sortingCheckString() {
	// 	cy.get('table').within(() => {
	// 		cy.get('tbody > tr').then((rows) => {
	// 			const strings = [];
	// 			rows.each((index, row) => {
	// 				cy.wrap(row)
	// 					.find('td:first')
	// 					.invoke('text')
	// 					.then((text) => {
	// 						strings.push(text.trim());
	// 					});
	// 			});

	// 			cy.wrap(strings).then((strings) => {
	// 				for (let i = 0; i < strings.length - 1; i++) {
	// 					expect(strings[i] <= strings[i + 1]).to.be.true;
	// 				}
	// 			});
	// 		});
	// 	});
	// }

	// // check table headers
	// checkTableHeaders(filter) {
	// 	// Assert that the table headers contain the expected text values
	// 	this.sessionConversionPageElements.tableHeaders().should(($headers) => {
	// 		// Extract the text content of the headers
	// 		const headerTexts = $headers
	// 			.map((index, header) => Cypress.$(header).text())
	// 			.get();
	// 		// Define the expected text values
	// 		if (filter === 'Item') {
	// 			let expectedTexts = [
	// 				filter,
	// 				'Description',
	// 				'Change vs Prev Time Period',
	// 				'Session PDP View Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Session Add to Cart Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Session Purchase Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Product Detail Page Views (PDP)',
	// 				'Change vs Prev Time Period',
	// 				'Add to Cart Count',
	// 				'Change vs Prev Time Period',
	// 				'Purchase Count'
	// 			];
	// 			expect(headerTexts).to.deep.equal(expectedTexts);
	// 		} else {
	// 			let expectedTexts = [
	// 				filter,
	// 				'Change vs Prev Time Period',
	// 				'Session PDP View Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Session Add to Cart Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Session Purchase Rate (%)',
	// 				'Change vs Prev Time Period',
	// 				'Product Detail Page Views (PDP)',
	// 				'Change vs Prev Time Period',
	// 				'Add to Cart Count',
	// 				'Change vs Prev Time Period',
	// 				'Purchase Count'
	// 			];
	// 			// Check if the expected text values are present in the headers
	// 			expect(headerTexts).to.deep.equal(expectedTexts);
	// 		}
	// 	});
	// }

	// table filter
	async tableFilterButton() {
		return this.sessionConversionPageElements.tableFilter();
	}

	// verify table filter has category/brand/item
	async checkTableFilter() {
		await this.sessionConversionPageElements.tableFilterMenu().isVisible();
		const buttons = await this.sessionConversionPageElements
			.tableFilterMenuBtn()
			.allTextContents();
		expect(buttons).toContain('Item');
	}

	// category, brand or item filter in table
	async SelectFilterInTable(filter: string) {
		return this.sessionConversionPageElements.selectTableFiltr(filter);
	}

	// get table label
	async getTableLabelValue(cellNumber: string) {
		const text = await this.sessionConversionPageElements
			.tableColumnXpath(cellNumber)
			.textContent();
		return { text };
	}

	// check table rows have data
	async checkDataInTableRows() {
		const rows = await this.sessionConversionPageElements
			.tableRowXpath()
			.all();
		for (const row of rows) {
			const text = await row.textContent();
			expect(text?.trim()).toBeTruthy();
		}
	}

	// session conversion chart daily/weekly dropdown
	async dlyWklyDrpDwnFromSessnConvCountChart() {
		return this.sessionConversionPageElements.dailyWklyDropDown();
	}

	// no data in table when category/brand selected for UPC
	async noDataTextTable() {
		return this.sessionConversionPageElements.noDataTable();
	}

	// values check from conversion
	async getMetricsValueForConversionFromchart(pos: string) {
		const text = await this.sessionConversionPageElements
			.getAnyMetricsValueForConversionFromchart(pos)
			.textContent();
		return { text };
	}

	// FIXME:
	// verify session conversion tooltip
	// verifySessionConvChartMetricsForCategory(
	// 	lastWeekNumberInList,
	// 	minWaitTime,
	// 	metricsPositionInConversionChart
	// ) {
	// 	return this.getMetricsValueForConversionFromchart(
	// 		metricsPositionInConversionChart
	// 	).then((metrics) => {
	// 		let metric = metrics.text;
	// 		cy.wait(minWaitTime);
	// 		return cy.wrap({ metric });
	// 	});
	// }

	//verify tooltip for session conversion chart
	// checkTooltipSessionConvChart(
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
	// 						this.seeDetailsLink({
	// 							timeout: minWaitTime
	// 						}).click();
	// 						cy.xpath(
	// 							'//div[@class="yJfHlxanVK_9sqvre0jL"]//button[text()="Daily"]'
	// 						).click();
	// 						this.dailyWeeklyFromSessionConversionTrend(
	// 							'Daily'
	// 						).click();
	// 						cy.wait(minWaitTime);
	// 						cy.xpath(
	// 							'//*[@id="soc-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).invoke('show');
	// 						cy.xpath(
	// 							'//*[@id="soc-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).click({ force: true });
	// 						cy.get('#soc-trend .am5-tooltip-container').invoke(
	// 							'show'
	// 						);
	// 						cy.get('#soc-trend .am5-tooltip-container').click({
	// 							force: true
	// 						});
	// 						cy.xpath(
	// 							"//div[@id='soc-trend']//canvas[@class='am5-layer-30']"
	// 						)
	// 							.invoke('show')
	// 							.click({ force: true });
	// 						cy.get('#soc-trend .am5-tooltip-container').each(
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
	// 														lineStg
	// 													).as('line');
	// 												} else if (
	// 													url ==
	// 													'https://www.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(
	// 														lineProd
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		const sessionPdpViewRateValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValue.sessionPdpViewRate;
	// 																		sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValueReceived.toString();
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
	// 																			sessionPdpViewRateValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															} else if (
	// 																url ==
	// 																'https://www.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: lineProd,
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
	// 																		const sessionPdpViewRateValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValue.sessionPdpViewRate;
	// 																		sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValueReceived.toString();
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
	// 																			sessionPdpViewRateValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															} else {
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		const sessionPdpViewRateValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValue.sessionPdpViewRate;
	// 																		sessionPdpViewRateValueReceived =
	// 																			sessionPdpViewRateValueReceived.toString();
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
	// 																			sessionPdpViewRateValueReceived
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

	//verify tooltip for session conversion count chart
	// checkTooltipSessionConvCountChart(
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
	// 						this.seeDetailsLink({
	// 							timeout: minWaitTime
	// 						}).click();
	// 						cy.xpath(
	// 							'//div[@class="yJfHlxanVK_9sqvre0jL"]//button[text()="Daily"]'
	// 						).click();
	// 						this.dailyWeeklyFromSessionConversionTrend(
	// 							'Daily'
	// 						).click();
	// 						cy.wait(minWaitTime);
	// 						cy.xpath(
	// 							'//*[@id="soc-count"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).invoke('show');
	// 						cy.xpath(
	// 							'//*[@id="soc-count"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
	// 						).click({ force: true });
	// 						cy.get('#soc-count .am5-tooltip-container').invoke(
	// 							'show'
	// 						);
	// 						cy.get('#soc-count .am5-tooltip-container').click({
	// 							force: true
	// 						});
	// 						cy.xpath(
	// 							"//div[@id='soc-count']//canvas[@class='am5-layer-30']"
	// 						)
	// 							.invoke('show')
	// 							.click({ force: true });
	// 						cy.get('#soc-count .am5-tooltip-container').each(
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
	// 														lineStg
	// 													).as('line');
	// 												} else if (
	// 													url ==
	// 													'https://www.walmartluminate.com/digitallandscapes/'
	// 												) {
	// 													cy.intercept(
	// 														lineProd
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		const sessionPdpViewValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewValueReceived =
	// 																			sessionPdpViewValue.pdpViewCount;
	// 																		sessionPdpViewValueReceived =
	// 																			sessionPdpViewValueReceived.toString();
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
	// 																			sessionPdpViewValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															} else if (
	// 																url ==
	// 																'https://www.walmartluminate.com/digitallandscapes/'
	// 															) {
	// 																cy.request({
	// 																	method: 'POST',
	// 																	url: lineProd,
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
	// 																		const sessionPdpViewValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewValueReceived =
	// 																			sessionPdpViewValue.pdpViewCount;
	// 																		sessionPdpViewValueReceived =
	// 																			sessionPdpViewValueReceived.toString();
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
	// 																			sessionPdpViewValueReceived
	// 																		);
	// 																	}
	// 																);
	// 															} else {
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
	// 																		cy.wait(
	// 																			minWaitTime
	// 																		);
	// 																		const sessionPdpViewRateValue =
	// 																			response.body.find(
	// 																				(
	// 																					item
	// 																				) =>
	// 																					item.position ===
	// 																					tooltipDay
	// 																			);
	// 																		let sessionPdpViewValueReceived =
	// 																			sessionPdpViewRateValue.pdpViewCount;
	// 																		sessionPdpViewValueReceived =
	// 																			sessionPdpViewValueReceived.toString();
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
	// 																			sessionPdpViewValueReceived
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

	// check table data with api
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
	// 						this.seeDetailsLink({
	// 							timeout: minWaitTime
	// 						}).click();
	// 						cy.wait(minWaitTime);
	// 						if (
	// 							url ==
	// 							'https://stg.walmartluminate.com/digitallandscapes/'
	// 						) {
	// 							cy.intercept(tableStg).as('table');
	// 						} else if (
	// 							url ==
	// 							'https://www.walmartluminate.com/digitallandscapes/'
	// 						) {
	// 							cy.intercept(tableProd).as('table');
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
	// 									let sessionPdpViewRate =
	// 										responseBody[0].sessionPdpViewRate;
	// 									if (sessionPdpViewRate === 0) {
	// 										sessionPdpViewRate = '-';
	// 									}
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate
	// 											);
	// 										}
	// 									);
	// 								});
	// 							} else if (
	// 								url ==
	// 								'https://www.walmartluminate.com/digitallandscapes/'
	// 							) {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: tableProd,
	// 									headers: header,
	// 									body: tablePayload
	// 								}).then((response) => {
	// 									const responseBody = response.body;
	// 									let sessionPdpViewRate =
	// 										responseBody[0].sessionPdpViewRate;
	// 									if (sessionPdpViewRate === 0) {
	// 										sessionPdpViewRate = '-';
	// 									}
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate
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
	// 									let sessionPdpViewRate =
	// 										responseBody[0].sessionPdpViewRate;
	// 									if (sessionPdpViewRate === 0) {
	// 										sessionPdpViewRate = '-';
	// 									}
	// 									this.getTableDataValue(3).then(
	// 										(metricsValue) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate
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

	// get table value from session conversion Page
	// getTableDataValue(cellNumber) {
	// 	return this.sessionConversionPageElements
	// 		.tableCell(cellNumber)
	// 		.invoke('text')
	// 		.then((text) => {
	// 			return cy.wrap({ text });
	// 		});
	// }

	// for upc check table data with api
	// checkTableDataWithApi(url, aUpc, lastWeekNumberInList, minWaitTime) {
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
	// 			perfPage.pasteUpcs(aUpc, { timeout: minWaitTime });
	// 			perfPage.ConfirmBtnUpc().click();
	// 			cy.wait(minWaitTime);
	// 			this.seeDetailsLink({ timeout: minWaitTime }).click();
	// 			this.tableFilterButton().click();
	// 			this.SelectFilterInTable('Item', { timeout: minWaitTime })
	// 				.should('be.visible')
	// 				.click();
	// 			cy.wait(minWaitTime);
	// 			if (
	// 				url == 'https://dev.walmartluminate.com/digitallandscapes/'
	// 			) {
	// 				cy.intercept(table).as('table');
	// 			} else if (
	// 				url == 'https://stg.walmartluminate.com/digitallandscapes/'
	// 			) {
	// 				cy.intercept(tableStg).as('table');
	// 			} else {
	// 				cy.intercept(tableProd).as('table');
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
	// 							let sessionPdpViewRate =
	// 								responseBody[0].sessionPdpViewRate;
	// 							if (sessionPdpViewRate === 0) {
	// 								sessionPdpViewRate = '-';
	// 							}
	// 							this.getTableDataValue(4).then(
	// 								(metricsValue) => {
	// 									cy.wait(minWaitTime);
	// 									expect(metricsValue.text).to.contain(
	// 										sessionPdpViewRate
	// 									);
	// 								}
	// 							);
	// 						});
	// 					} else if (
	// 						url ==
	// 						'https://www.walmartluminate.com/digitallandscapes/'
	// 					) {
	// 						cy.request({
	// 							method: 'POST',
	// 							url: tableProd,
	// 							headers: header,
	// 							body: tablePayload
	// 						}).then((response) => {
	// 							const responseBody = response.body;
	// 							let sessionPdpViewRate =
	// 								responseBody[0].sessionPdpViewRate;
	// 							if (sessionPdpViewRate === 0) {
	// 								sessionPdpViewRate = '-';
	// 							}
	// 							this.getTableDataValue(4).then(
	// 								(metricsValue) => {
	// 									cy.wait(minWaitTime);
	// 									expect(metricsValue.text).to.contain(
	// 										sessionPdpViewRate
	// 									);
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
	// 							let sessionPdpViewRate =
	// 								responseBody[0].sessionPdpViewRate;
	// 							if (sessionPdpViewRate === 0) {
	// 								sessionPdpViewRate = '-';
	// 							}
	// 							this.getTableDataValue(4).then(
	// 								(metricsValue) => {
	// 									cy.wait(minWaitTime);
	// 									expect(metricsValue.text).to.contain(
	// 										sessionPdpViewRate
	// 									);
	// 								}
	// 							);
	// 						});
	// 					}
	// 				});
	// 			});
	// 		});
	// }
}

export default SessionConversionPage;
