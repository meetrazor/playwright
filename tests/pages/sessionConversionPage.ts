import { expect, Page } from '@playwright/test';
import PerformancePage from './performancePage';
import { DEFAULT_TIMEOUT } from '../../config';
import {
	line,
	lineProd,
	lineStg,
	table,
	tableProd,
	tableStg
} from '../../shared/routes';

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
	async verifyToolTipMessage() {
		await this.sessionConversionPageElements.conversionHoverText().hover();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await expect(
			this.sessionConversionPageElements.messageAfterHover()
		).toBeVisible();
	}

	// verify tooltip for session conversion trend message
	async verifyToolTipSessionConvTrendMessage() {
		await this.sessionConversionPageElements
			.conversionTrendHoverText()
			.hover();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await expect(
			this.sessionConversionPageElements.TrendmessageAfterHover()
		).toBeVisible();
	}

	// verify tooltip message for conversion count chart
	async verifyToolTipSessionConvCountMessage() {
		await this.sessionConversionPageElements
			.conversionCountHoverText()
			.hover();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
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
	async sortingCheck() {
		const numbers = await this.page.$$eval('table tbody > tr', (rows) =>
			rows.map((row) =>
				parseInt(
					row.querySelector('td:first-child')?.textContent?.trim() ||
						'0',
					10
				)
			)
		);

		for (let i = 0; i < numbers.length - 1; i++) {
			expect(numbers[i]).toBeLessThanOrEqual(numbers[i + 1]);
		}
	}

	// //perform sort string

	async sortingCheckString() {
		const rows = await this.page.$$eval('table tbody > tr', (rows) =>
			rows.map(
				(row) =>
					row.querySelector('td:first-child')?.textContent?.trim() ??
					''
			)
		);

		for (let i = 0; i < rows.length - 1; i++) {
			expect(rows[i] <= rows[i + 1]).toBeTruthy();
		}
	}

	// // check table headers
	async checkTableHeaders(filter: string) {
		// Locate the table headers
		const headerElements = this.page.locator('.table-header-selector'); // Replace with actual selector for table headers
		const headerTexts = await headerElements.evaluateAll((headers) =>
			headers.map((header) => (header as HTMLElement).innerText)
		);

		// Define the expected text values based on the filter
		let expectedTexts: string[];
		if (filter === 'Item') {
			expectedTexts = [
				filter,
				'Description',
				'Change vs Prev Time Period',
				'Session PDP View Rate (%)',
				'Change vs Prev Time Period',
				'Session Add to Cart Rate (%)',
				'Change vs Prev Time Period',
				'Session Purchase Rate (%)',
				'Change vs Prev Time Period',
				'Product Detail Page Views (PDP)',
				'Change vs Prev Time Period',
				'Add to Cart Count',
				'Change vs Prev Time Period',
				'Purchase Count'
			];
		} else {
			expectedTexts = [
				filter,
				'Change vs Prev Time Period',
				'Session PDP View Rate (%)',
				'Change vs Prev Time Period',
				'Session Add to Cart Rate (%)',
				'Change vs Prev Time Period',
				'Session Purchase Rate (%)',
				'Change vs Prev Time Period',
				'Product Detail Page Views (PDP)',
				'Change vs Prev Time Period',
				'Add to Cart Count',
				'Change vs Prev Time Period',
				'Purchase Count'
			];
		}

		// Assert that the table headers contain the expected text values
		expect(headerTexts).toEqual(expectedTexts);
	}

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

	async seeDetailsLink() {
		return this.sessionConversionPageElements.seeDetailsLink();
	}

	// FIXME:
	// verify session conversion tooltip
	async verifySessionConvChartMetricsForCategory(
		metricsPositionInConversionChart: string
	) {
		const metric = await this.getMetricsValueForConversionFromchart(
			metricsPositionInConversionChart
		);
		return { text: metric.text };
	}

	//verify tooltip for session conversion chart
	async checkTooltipSessionConvChart(
		lastWeekNumberInList: string,
		intervalSrc: string
	) {
		let tooltipDay: string;
		let interval: string;
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await perfPage.dateFilterApplyBtnClick();

		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();

		const departNum = await perfPage.getDepartmentNumber();
		const departmentNumber = departNum.numberExtracted;

		await this.page.locator('button:has-text("Confirm")').click();

		const companyId = await perfPage.getCompanyId();

		const categoryNbr = category.text?.split(' ')[0];

		await (await perfPage.seeDetailsLink()).click();

		await this.page
			.locator(
				'//div[@class="yJfHlxanVK_9sqvre0jL"]//button[text()="Daily"]'
			)
			.click();
		await (
			await this.dailyWeeklyFromSessionConversionTrend('Daily')
		).click();

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Show and click the tooltip container
		await this.page
			.locator(
				'//*[@id="soc-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
			)
			.hover();
		await this.page
			.locator(
				'//*[@id="soc-trend"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
			)
			.click({ force: true });

		let lineUrl = '';
		if (process.env.ENV === 'QA') {
			lineUrl = lineStg;
		} else if (process.env.ENV === 'PROD') {
			lineUrl = lineProd;
		} else {
			lineUrl = line;
		}
		const cookieString = await perfPage.getCookie();

		// Get the tooltip text and perform API requests accordingly
		const tooltipContainers = await this.page
			.locator('#soc-trend .am5-tooltip-container')
			.elementHandles();
		for (const tooltipContainer of tooltipContainers) {
			const tooltipText = await tooltipContainer.$eval(
				'[role="tooltip"]',
				(el) => el.textContent
			);
			tooltipDay = tooltipText?.substring(0, 6) ?? '';

			interval = intervalSrc.includes('Daily') ? 'Daily' : 'Weekly';

			const linePayload = perfPage.getLinePayloadForCategory(
				dateStart,
				dateEnd,
				`${departmentNumber}_${categoryNbr}`,
				interval,
				companyId
			);

			const headers = await perfPage.getHeadersAndCookies(cookieString);

			const response = await this.page.request.post(lineUrl, {
				headers,
				data: linePayload
			});

			const jsonResponse = await response.json();

			const sessionPdpViewRateValue = await jsonResponse.find(
				(item: any) => item.position === tooltipDay
			);
			const sessionPdpViewRateValueReceived =
				sessionPdpViewRateValue.sessionPdpViewRate.toString();
			const tooltipTextCleaned = tooltipText?.replace(',', '');

			expect(tooltipTextCleaned).toContain(
				sessionPdpViewRateValueReceived
			);
		}
	}

	//verify tooltip for session conversion count chart
	async checkTooltipSessionConvCountChart(
		lastWeekNumberInList: string,
		intervalSrc: string
	) {
		let tooltipDay: string;
		let interval: string;
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
		await perfPage.dateFilterApplyBtnClick();

		const category = await perfPage.checkSelectedCategoryIsApplied('1');
		await (await perfPage.verifyDeptAndCatFilter()).click();

		const departNum = await perfPage.getDepartmentNumber();
		const departmentNumber = departNum.numberExtracted;

		await this.page.locator('button:has-text("Confirm")').click();

		const companyId = await perfPage.getCompanyId();

		const categoryNbr = category.text?.split(' ')[0];

		await (await perfPage.seeDetailsLink()).click();

		await this.page
			.locator(
				'//div[@class="yJfHlxanVK_9sqvre0jL"]//button[text()="Daily"]'
			)
			.click();
		await (
			await this.dailyWeeklyFromSessionConversionTrend('Daily')
		).click();

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Show and click the tooltip container
		await this.page
			.locator(
				'//*[@id="soc-count"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
			)
			.hover({ force: true });
		await this.page
			.locator(
				'//*[@id="soc-count"]//div[@class="am5-tooltip-container"]//div[@role="tooltip"][1]'
			)
			.click({ force: true });

		let lineUrl = '';
		if (process.env.ENV === 'QA') {
			lineUrl = lineStg;
		} else if (process.env.ENV === 'PROD') {
			lineUrl = lineProd;
		} else {
			lineUrl = line;
		}
		const cookieString = await perfPage.getCookie();
		const headers = await perfPage.getHeadersAndCookies(cookieString);

		// Get the tooltip text and perform API requests accordingly
		const tooltipContainers = await this.page
			.locator('#soc-count .am5-tooltip-container')
			.elementHandles();
		for (const tooltipContainer of tooltipContainers) {
			const tooltipText = await tooltipContainer.$eval(
				'[role="tooltip"]',
				(el) => el.textContent
			);
			tooltipDay = tooltipText?.substring(0, 6) ?? '';

			interval = intervalSrc.includes('Daily') ? 'Daily' : 'Weekly';

			const linePayload = perfPage.getLinePayloadForCategory(
				dateStart,
				dateEnd,
				`${departmentNumber}_${categoryNbr}`,
				interval,
				companyId
			);

			const response = await this.page.request.post(lineUrl, {
				headers,
				data: linePayload
			});

			const jsonResponse = await response.json();

			const sessionPdpViewValue = jsonResponse.find(
				(item: any) => item.position === tooltipDay
			);
			const sessionPdpViewValueReceived =
				sessionPdpViewValue.pdpViewCount.toString();
			const tooltipTextCleaned = tooltipText?.replace(',', '');

			expect(tooltipTextCleaned).toContain(sessionPdpViewValueReceived);
		}
	}

	// check table data with api
	async verifyTableDataWithApi(lastWeekNumberInList: string) {
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await perfPage.dateFilterApplyBtnClick();

		await (await perfPage.verifyDeptAndCatFilter()).click();
		await (await perfPage.checkUncheckADepartment(1)).click();
		await (await perfPage.checkUncheckADepartment(1)).click();

		await this.page.click('button:has-text("Confirm")');
		const category = await perfPage.checkSelectedCategoryIsApplied('1');

		await (await perfPage.verifyDeptAndCatFilter()).click();
		const departNum = await perfPage.getDepartmentNumber();

		await this.page.click('button:has-text("Confirm")');
		const companyId = await perfPage.getCompanyId();

		const compnyId = companyId;
		let categoryNbr = category.text?.split(' ')[0];
		const dNum = departNum.numberExtracted;

		await (await perfPage.seeDetailsLink()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		let tableUrl = '';
		if (process.env.ENV === 'QA') {
			tableUrl = tableStg;
		} else if (process.env.ENV === 'PROD') {
			tableUrl = tableProd;
		} else {
			tableUrl = table;
		}

		const cookieString = await perfPage.getCookie();

		const headers = await perfPage.getHeadersAndCookies(cookieString);
		const tablePayload = perfPage.getPayloadTable(
			dateStart,
			dateEnd,
			`${dNum}_${categoryNbr}`,
			compnyId
		);

		const response = await this.page.request.post(tableUrl, {
			headers,
			data: tablePayload
		});

		const responseBody = await response.json();
		let sessionPdpViewRate = responseBody[0]?.sessionPdpViewRate || '-';

		const metricsValue = await this.getTableDataValue(3);
		expect(metricsValue.text).toContain(sessionPdpViewRate);
	}

	// get table value from session conversion Page
	async getTableDataValue(cellNumber: number) {
		const text = this.sessionConversionPageElements
			.tableCell(cellNumber.toString())
			.innerText();

		return { text };
	}

	// for upc check table data with api
	async checkTableDataWithApi(aUpc: string, lastWeekNumberInList: string) {
		const perfPage = new PerformancePage(this.page);
		const dates = await perfPage.datesFromFilter(lastWeekNumberInList);
		const dateStart = dates.startreversedDateReceived;
		const dateEnd = dates.endreversedDateReceived;

		await perfPage.clickWeekFilter(lastWeekNumberInList);
		await perfPage.dateFilterApplyBtnClick();

		await (await perfPage.checkAndClickOnUpcBtn()).click();
		await perfPage.pasteUpcs(aUpc);
		await (await perfPage.ConfirmBtnUpc()).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		await (await this.seeDetailsLink()).click();
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

		const companyId = await perfPage.getCompanyId();
		const cookies = await perfPage.getCookie();

		const headers = await perfPage.getHeadersAndCookies(cookies);
		const tablePayload = perfPage.getTablePayloadForUpc(
			dateStart,
			dateEnd,
			aUpc,
			companyId
		);

		const response = await this.page.request.post(tableUrl, {
			headers,
			data: tablePayload
		});

		const responseBody = await response.json();
		let sessionPdpViewRate = responseBody[0]?.sessionPdpViewRate || '-';

		const metricsValue = await this.getTableDataValue(4);
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		expect(metricsValue.text).toContain(sessionPdpViewRate);
	}
}

export default SessionConversionPage;
