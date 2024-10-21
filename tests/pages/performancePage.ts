import { expect, type Page } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '../../config';
import CommonClass from './commonFunctions';
import { dow, dowProd, dowStg } from '../../shared/routes';

class PerformancePage extends CommonClass {
	performanceElements = {
		// List of all the elements on DashBoard Page
		performancePageVisible: (heading: string) =>
			this.page.locator('//div[@title="' + heading + '"]'),

		// landing page title
		checkPageTitle: (title: string) =>
			this.page.locator('//p[text()="' + title + '"]'),

		// xpath for date filter
		dateFilterIcon: () =>
			this.page.locator("//*[@data-testid='dateFilterBtn']"),

		// xpath of week number list filter
		weekNumberList: (WeekNumbersFromList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" + WeekNumbersFromList + ']'
			),

		// date filter apply button click
		dateFilterApplyBtnClick: () =>
			this.page.locator('//button[@id="applyBtn"]'),

		// visibility of date filter
		dateFilterBtn: () =>
			this.page.locator("//*[@data-testid='dateFilterBtn']"),

		// visibility of platform button
		platformBtn: () =>
			this.page.locator('//button[contains(text(),"Platform")]'),

		// visibility of Departments and Categories filter
		categoryFilter: () =>
			this.page.locator('//button[contains(text(),"Category")]'),

		//visibility of billboard tiles
		billboard1stTiles: () =>
			this.page.locator(
				"//button[text()='Product Detail Page Views (PDP)']"
			),
		billboard2ndstTiles: () =>
			this.page.locator("//button[text()='Add to Cart Count']"),
		billboard3rdstTiles: () =>
			this.page.locator("//button[text()='Purchase Count']"),
		billboard4thTiles: () =>
			this.page.locator("//button[text()='Session Purchase Rate (%)']"),

		// visibility of session conversion chart
		ConversionChartMetrics: (metrics: string) =>
			this.page.locator("//div[text()='" + metrics + "']"),

		//verify visibility of day of the week chart
		verifyvisibilityDayOfTheWeekChart: () =>
			this.page.locator("div[id='hourly-daily-trend']"),

		//session share chart visibility
		sessionshareChartPresence: () =>
			this.page.locator('div[id="bar-chart-container"]'),

		// donut chart visibility
		donutChartPresence: () => this.page.locator('div[id="donut-chart"]'),

		//date filter dialogue xpath
		dateFilterDialogue: () =>
			this.page.locator(
				"//div[contains(@class,'MuiPaper-root MuiPopover-paper MuiPaper-elevation')]"
			),

		//default date value
		defaultDateValue: (dateFilterDefaultValue: string) =>
			this.page.locator("//*[text()='" + dateFilterDefaultValue + "']"),

		//cancel button in date filter
		clickCancelBtnDateFilter: () =>
			this.page.locator("//button[@id='cancelBtn']"),

		// xpath for calender filter
		calenderFilterXpath: (dateVisible: string) =>
			this.page.locator("//span[contains(text(),'" + dateVisible + "')]"),

		// xpath of which week/weeks user wants to select. for example last week, last 26 or last 2 weeks etc.
		clickWeekNumbersList: (WeekNumbersFromList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" + WeekNumbersFromList + ']'
			),

		// xpath of week text selected
		weekText: (WeekNumbersFromList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" +
					WeekNumbersFromList +
					"]//div[@class='MuiListItemText-root MuiListItemText-multiline']/span"
			),

		//xpath to get the dates from calender title
		getTheDatesFromCalenderTitle: (WeekNumbersFromList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" +
					WeekNumbersFromList +
					"]//div[@class='MuiListItemText-root MuiListItemText-multiline']/p"
			),

		//xpath of selected date
		getTheSelectedDate: () =>
			this.page.locator(
				"//div[@role='presentation']//*[local-name()='svg']/following-sibling::p[contains(@class,'MuiTypography-root')]"
			),

		//xpath of current month visible in date filter
		currentMonthDateFilter: (currentMonth: string) =>
			this.page.locator(
				"//div[contains(@class,'MuiGrid-root MuiGrid-container MuiGrid-grid-xs-')]/div/div/div[contains(text(),'" +
					currentMonth +
					"')]"
			),

		// xpath of calender filter date
		weekToDate: (weekToDateInList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" +
					weekToDateInList +
					"]//div[@class='MuiListItemText-root MuiListItemText-multiline']/p"
			),

		// xpath of calender filter button
		calenderFilterBtn: (customFromDateFilter: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" + customFromDateFilter + ']'
			),

		// xpath of forward button from calender
		calenderForwardBtn: () =>
			this.page.locator("//button[@id='nextMonth']"),

		//xpath of calender back button
		calenderBackBtn: () => this.page.locator("//button[@id='prevMonth']"),

		// xpath of select platform filter
		platformFilter: () =>
			this.page.locator("//button[@data-test-cy='Platform-Filter']"),

		// xpath for checking number of platforms selected
		numOfPlatformSelected: (filter: string) =>
			this.page.locator(
				"//button[contains(text(),'Platform: " + filter + "')]"
			),

		// xpath of web/app platform
		selectWebOrApp: (platform: string) =>
			this.page.locator("//span[text()='" + platform + "']"),

		// xpath to get text from billboard chart
		getDataVisibilityCheckBillBoardChart: () =>
			this.page.locator(
				"//div[@class='uS8I9PrbyA_xw5sC54Po']/div[1]/div/span[@class='w_D6 w_D8 w_EB']"
			),

		// xpath of department and category dialogue
		getDeptAndCategoryDialogue: () =>
			this.page.locator(
				"//div[@class='HierarchySelector-module_mapsContainer__KYT8m']"
			),

		// xpath od deptAndCategoryFilter
		getDeptCategoryFilter: () =>
			this.page.locator("//span//button[contains(text(),'Category')]"),

		// xpath to check firstCategory is selected
		firstCategorySelectedXpath: () =>
			this.page.locator(
				"//div[contains(@class, 'HierarchySelector-module_selectionItemList__rsWHN')]/div[1]//*[local-name()='svg']"
			),

		// xpath of categort hirarchy popup
		categoryHirarchyDialogue: () =>
			this.page.locator(
				"//div[@class='HierarchySelector-module_mapsContainer__KYT8m']/div[2]/div/div[2]/div"
			),

		// xpath of expand/collapse button of department Filter
		departmentExpandCollapseFilter: () =>
			this.page.locator("//button[@aria-label='expand-2']"),

		// xpath of selected category from category filter
		categorySelectedFromFilter: (num: string) =>
			this.page.locator(
				"//div[@class='HierarchySelector-module_selectionItemList__rsWHN']/div[" +
					num +
					']//button'
			),

		// xpath of applied category in category filter
		categoryAppliedInCategoryFilter: () =>
			this.page.locator(
				"span[class='w_Bz'] .Chip-module_chip__3f0zv.Chip-module_small__GfjIC[type='button']"
			),

		// xpath to click on billboard menu
		billboardMenu: (menuPos: string) =>
			this.page.locator(
				"//body/div[@id='app']/div/div[@data-test-cy='dashboard']/div[@data-test-cy='MetricsBox']/div/div[" +
					menuPos +
					']/div/button'
			),
		//body/div[@id='app']/div/div[@data-test-cy='dashboard']/div[@data-test-cy='MetricsBox']/div[1]
		// xpath of billboard menu dialog
		billboardMenuOption: () =>
			this.page.locator('div[data-testid="menu"] button'),

		// xpath of session conversion see details link
		seeDetailsSessionConvLink: () =>
			this.page.locator("//a[@href='/digitallandscapes/conversion']"),

		// xpath to select any of the billboard metrics
		selectBillboardMetrics: (metrics: string) =>
			this.page.locator(
				"//div[@data-testid='menu']//span[text()='" + metrics + "']"
			),

		// xpath to get metrics value from billboard
		getMetricsValueBillboard: () =>
			this.page.locator(
				"//body/div[@id='app']/div/div[@data-test-cy='dashboard']/div[@data-test-cy='MetricsBox']/div/div[1]/div/button"
			),
		getFullMetricsValueBillboard: (index:string) =>
			this.page.locator(
				"//body/div[@id='app']/div/div[@data-test-cy='dashboard']/div[@data-test-cy='MetricsBox']/div/div["+index+"]/div"
			),
		// xpath to get metrics value from billboard for 2nd metrics
		getSecondMetricsValueBillboard: () =>
			this.page.locator(
				"//body/div[@id='app']/div/div[@data-test-cy='dashboard']/div[@data-test-cy='MetricsBox']/div/div[2]/div/button"
			),

		// xpath for conversions tooltip
		getAnyMetricsValueForConversionFromchart: (metricsPositionInUI: any) =>
			this.page.locator(
				"//preceding-sibling::div[text()='PDP View Rate']/following-sibling::div"
			),

		// visibility of session conversion chart
		donutChart: () => this.page.locator('div[id="donut-chart"]'),

		// xpath to check donut metrics
		donutMetrics: (metricsName: string) =>
			this.page.locator(
				"//*[@id='donut-chart']//div[@class='am5-focus-container']/div[contains(@aria-label,'" +
					metricsName +
					"')]"
			),

		// xpath of sot details
		sotDetails: () =>
			this.page.locator(
				"//a[@href='/digitallandscapes/source-of-traffic']"
			),

		// xpath of sot details page visibility
		sotDetailsPageVisibility: () =>
			this.page.locator(
				'//span[@class="w_D6 w_D8 w_EB PageHeader-module_pageTitle__L9wY4" and text()="Source of Traffic"]'
			),

		// xpath of session share chart
		sessionShareChart: () =>
			this.page.locator('div[id="bar-chart-container"]'),

		// xpath of see details session share
		sessionShareSeeDetails: () =>
			this.page.locator(
				"//a[@href='/digitallandscapes/category-share-of-session']"
			),

		// xpath for selecting metrics from dropdown in session share chart
		sessionShareDropdown: (filter: string) =>
			this.page.locator(
				"//div[@class='wgvDhe2c4O5T6udjdLoZ']//button[text()='" +
					filter +
					"']"
			),

		// xpath for session share menu item
		sessionShareMenuItm: (filter: string) =>
			this.page.locator("//button//span[text()='" + filter + "']"),

		// xpath of hod chart
		DayOfWeekChart: () => this.page.locator("div[id='hourly-daily-trend']"),

		// xpath of visibility of hod or dow filter
		visibilityOfHODorDOWFilter: (filter: string) =>
			this.page.locator("//h4[text()='" + filter + "']"),

		// xpath of visibility of date range from dow filter
		visibilityOfDateRangeFromDOW: (WeekDateRange: string) =>
			this.page.locator("//button[text()='" + WeekDateRange + "']"),

		// xpath of pageView Atc Purchase SelectionFilter
		pageAtcPurchaseSelectionFilter: (filter: string) =>
			this.page.locator(
				"//div[@class='SM5_xKa5EaKWnrSV_CeA']//button[text()='" +
					filter +
					"']"
			),

		// xpath of legends below hod or dow filter
		legendBelowHODDOWFilter: (filter: string) =>
			this.page.locator(
				"#hourly-daily-trend .am5-focus-container div[aria-label*='" +
					filter +
					"']"
			),

		// xpath for hod Chart link
		hodChartLink: () =>
			this.page.locator("//a//span[text()='Hour of the day']"),

		// xpath of upc button
		upcBtn: () => this.page.locator('button[data-testid="upc-button"]'),

		// upc clear btn
		upcClearBtn: () =>
			this.page.locator(
				"//button[@data-testid='upc-button-grid-empty' and @disabled]"
			),

		// upc confirm btn
		upcConfirmBtn: () =>
			this.page.locator(
				"//button[@data-testid='upc-confirm-button' and @disabled]"
			),

		// xpath to paste in upc area
		upcPasteArea: () =>
			this.page.locator(
				'//input[contains(@placeholder,"Search or copy & paste a list")]'
			),

		// paste a upc area
		upcPaste: () =>
			this.page.locator(
				'//input[contains(@placeholder,"Copy & paste a list")]'
			),
		// xpath of pasted upc
		pastedUpc: (aUpc: string) =>
			this.page.locator("//div[text()='" + aUpc + "']"),

		// xpath of confirm upc button
		confirmUpcBtn: () =>
			this.page.locator("//button//span[text()='Confirm']"),

		// category filter diabled
		categoryFilterDisabled: () =>
			this.page.locator(
				"//button[contains(text(),'Category') and @disabled]"
			),

		// xpath of disabled category filter button
		disabledCategoryBtn: () =>
			this.page.locator(
				"//button[contains(text(),'Category') and @disabled]"
			),

		// xpath to check error message
		upcErrMsg: (filter: string) =>
			this.page.locator("//div[text()='" + filter + "']"),

		// xpath of clear upc btn
		clearBtnUPC: () => this.page.locator("//span[text()='Clear']"),

		// xpath of clear upc btn
		clearUpcLink: () => this.page.locator("//div[text()='Clear UPCs']"),

		// xpath of text field of upc
		textFieldUpc: (upc: string) =>
			this.page.locator("//input[@value='" + upc + "']"),

		// xpath of disabled upc confirm button
		disableUpcConfirmBtn: () =>
			this.page.locator(
				"//button[@data-testid='upc-confirm-button' and @disabled]"
			),

		// xpath of dataSet button
		dataSetBtn: () => this.page.locator("//button[text()='Export']"),

		// xpath for datasetMenu item
		datasetMenuItem: (filter: string) =>
			this.page.locator("//button//span[text()='" + filter + "']"),

		// xpath of download
		download: () => this.page.locator("//button[text()='Download']"),

		//xpath for message in download popup
		messageDownload: () =>
			this.page.locator(
				"//div[contains(text(),'Current download are limited to 1,500 items')]"
			),

		// xpath for download model daily/weekly granularity label
		labelDownloadModel: (filter: string) =>
			this.page.locator(
				"//span[text()='" + filter + " data granularity']"
			),

		// xpath for Dataset Download label
		datasetDownloadModel: () =>
			this.page.locator("//h2[text()='Dataset Download']"),

		// xpath of expand collapse button
		expandCollapseBtn: () => this.page.locator('#expand-2'),

		// xpath for category hirarchy portion
		categoryHirarchyPortion: () =>
			this.page.locator(
				"//div[@class='HierarchySelector-module_itemsCollapseShow__Q2bD-']"
			),

		// xpath of week filter
		weekFilter: (weekList: string) =>
			this.page.locator(
				"//li[@class='MuiListItem-root'][" +
					weekList +
					"]//div[@class='MuiListItemText-root MuiListItemText-multiline']/p"
			),

		// xpath to get department
		getDepartment: (num: string) =>
			this.page.locator(
				"//div[@class='HierarchySelector-module_itemList__6332A']/div[" +
					num +
					']//span[@title]'
			),

		// xpath of tooltip dow
		dowTooltip: () =>
			this.page.locator(
				'//div[@id="hourly-daily-trend"]//div[@role="tooltip"][1]'
			),

		// xpath for avg dow

		dowAvgTooltip: () =>
			this.page.locator(
				'//div[@id="hourly-daily-trend"]//div[@role="tooltip"][2]'
			),

		// xpath of hod and dow legends
		hodDowLegends: (legend: string) =>
			this.page.locator(
				"//div[@id='hourly-daily-trend']//div[contains(@aria-label,'" +
					legend +
					"')]"
			),

		// xpath of hod/dow menu filter
		dowHodFilter: () =>
			this.page.locator(
				"//div[@class='SM5_xKa5EaKWnrSV_CeA']/div[2]/button"
			),

		// xpath of upc count
		upcCount: () =>
			this.page.locator(
				"//span[@class='w_DY w_Dc w_Dd GlMLs2D_MNVj_9yHqPAP']"
			),

		// xpath for account button
		Accountlogout: () =>
			this.page.locator("//button/span[text()='Account']"),

		//logout xpath
		logout: () => this.page.locator("//button//p[text()='Log Out']"),

		//login button xpath
		login: () => this.page.locator("//button[@id='loginBtn']"),

		//donut hover text
		dailyHoverText: () => this.page.locator("//h4[text()='Daily Traffic']"),

		//textMessageAfterHover
		messageAfterHover: () =>
			this.page.locator(
				"//p[text()='Daily engagement trends throughout the week.']"
			)
	};

	async checkPerformancePageVisible(heading: any) {
		await expect(
			this.performanceElements.performancePageVisible(heading)
		).toBeVisible();
	}

	//check page title

	async checkPageTitle(title: any) {
		await expect(
			this.performanceElements.checkPageTitle(title)
		).toBeVisible();
	}
	dateFilterIcon() {
		return this.performanceElements.dateFilterIcon();
	}

	//which week/weeks user wants to select. for example last week, last 26 or last 2 weeks etc.
	clickWeekNumbersList(WeekNumbersFromList: any) {
		return this.performanceElements.weekNumberList(WeekNumbersFromList);
	}

	async dateFilterApplyBtnClick() {
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.performanceElements
			.dateFilterApplyBtnClick()
			.click({ force: true });
	}

	// verify visibility of components/tiles in performance page
	async verifyvisibilityComponentsOnPerformancePage(url: any) {
		// visibility of date filter
		await expect(this.performanceElements.dateFilterBtn()).toBeVisible();
		// visibility of Platform
		await expect(this.performanceElements.platformBtn()).toBeVisible();
		// visibility of Departments and Categories filter
		await expect(this.performanceElements.categoryFilter()).toBeVisible();
		// visibility of billboard
		await expect(
			this.performanceElements.billboard1stTiles()
		).toBeVisible();
		await expect(
			this.performanceElements.billboard2ndstTiles()
		).toBeVisible();
		await expect(
			this.performanceElements.billboard3rdstTiles()
		).toBeVisible();
		await expect(
			this.performanceElements.billboard4thTiles()
		).toBeVisible();
		// visibility of session conversion chart
		await expect(
			this.performanceElements.ConversionChartMetrics('Product Views')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('PDP View Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('Add to Cart Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From PDP')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From non-PDP')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From AtC')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('Purchase Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From non-AtC')
		).toBeVisible();
		// check visibility of dow/hod chart
		await expect(
			this.performanceElements.verifyvisibilityDayOfTheWeekChart()
		).toBeVisible();
		// check visibility of sessionshareChart
		await expect(
			this.performanceElements.sessionshareChartPresence()
		).toBeVisible();
		// check visibility of donut chart and its metrics
		await expect(
			this.performanceElements.donutChartPresence()
		).toBeVisible();

		// FIXME: FIX THIS AFTER DONUTPAGE
		// await expect(
		// 	sotDonutPage.checkDonutMetrics('Walmart.com External')
		// ).toBeVisible();
		// await expect(
		// 	sotDonutPage.checkDonutMetrics('Mobile App Non-Search')
		// ).toBeVisible();
		// await expect(
		// 	sotDonutPage.checkDonutMetrics('Mobile App Search')
		// ).toBeVisible();
		// await expect(
		// 	sotDonutPage.checkDonutMetrics('Walmart.com Non-Search')
		// ).toBeVisible();
		// await expect(
		// 	sotDonutPage.checkDonutMetrics('Walmart.com Search')
		// ).toBeVisible();
	}

	// dateFilter dialogue
	async dateFilterDialogue() {
		return this.performanceElements.dateFilterDialogue();
	}

	// to verify default value in date filter
	async dateFilterDefaultValue(dateFilterDefaultValue: any) {
		return this.performanceElements.defaultDateValue(
			dateFilterDefaultValue
		);
	}

	// click on logout
	async logout() {
		await expect(this.performanceElements.Accountlogout()).toBeVisible();
		await this.performanceElements.Accountlogout().click();
		await expect(this.performanceElements.logout()).toBeVisible();
		await this.performanceElements.logout().click();
	}

	// login button visible
	async login() {
		return this.performanceElements.login();
	}

	// cancel button from date filter
	async clickCancelBtnDateFilter() {
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		return this.performanceElements.clickCancelBtnDateFilter();
	}

	// forward button in calender
	async forwardButtonInCalender() {
		return this.performanceElements.calenderForwardBtn();
	}

	// for platform filter
	async selectPlatformDropdown() {
		return this.performanceElements.platformFilter();
	}

	// get the text from the list of the selected week
	async checkTextOfWeeksSelected(WeekNumbersFromList: string) {
		return await this.performanceElements
			.weekText(WeekNumbersFromList)
			.innerText();
	}

	// // get selected date from list and the date coming in into calender title post selection
	async verifyDateSelectedWithDateDisplayesOnCalender(
		WeekNumbersFromList: any
	) {
		// Get the date from the calendar title and verify with the selected date range
		let getSelectedDateFilterDates =
			(await this.performanceElements
				.getTheDatesFromCalenderTitle(WeekNumbersFromList)
				.innerText()) ?? '';
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		// Get the selected date
		const getCalenderTitleDateText =
			(await this.performanceElements.getTheSelectedDate().innerText()) ??
			'';

		// Returning both dates for comparison or further processing
		return {
			getSelectedDateFilterDates,
			getCalenderTitleDateText
		};
	}
	// current month visible in date filter calender
	async currentMonthInCalender(currentMonth: string) {
		return this.performanceElements.currentMonthDateFilter(currentMonth);
	}

	// // choose start and end date using custom date filter..here we are selecting Week to date using custom
	async clickStartAndEndDate(
		weekToDateInList: any,
		customFromDateFilter: any
	) {
		let endreversedDateReceived: string;
		let startreversedDateReceived: string;

		// Get the text from weekToDate
		let getText =
			(await this.performanceElements
				.weekToDate(weekToDateInList)
				.innerText()) ?? '';

		// Click on custom menu button
		await this.performanceElements
			.calenderFilterBtn(customFromDateFilter)
			.click();

		// Split the date from getText
		const { firstDate, secondDate } = await this.splitDate(getText);

		// Format and reverse the first date
		const firstDateNumeric = await this.formatDate(firstDate);
		startreversedDateReceived = await this.reverseDate(firstDateNumeric);

		// Format and reverse the second date
		const secondDateNumeric = await this.formatDate(secondDate);
		endreversedDateReceived = await this.reverseDate(secondDateNumeric);

		// Convert the received date string to a Date object
		const targetDate = new Date(startreversedDateReceived);

		// Define the start of the week (January 27th, 2024 in your case)
		const weekStart = new Date(2024, 0, 27);

		// Calculate the number of days between the start of the week and the target date
		const daysDifference = Math.floor(
			(targetDate.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000)
		);

		// Calculate the week number
		const startDateWeekNumber = Math.ceil((daysDifference + 1) / 7);

		// Calculate the second target date
		const secondTargetDate = new Date(endreversedDateReceived);
		const secondYearStart = new Date(secondTargetDate.getFullYear(), 0, 1);
		const secondDaysDifference = Math.floor(
			(secondTargetDate.getTime() - secondYearStart.getTime()) /
				(24 * 60 * 60 * 1000)
		);

		// Calculate the week number for the second date
		const secondStartDateWeekNumber =
			Math.floor(secondDaysDifference / 7) + 1;

		// Click the forward button in the calendar
		await (await this.forwardButtonInCalender()).click();

		// Get the month and year of the first date
		const monthYearOfStartDates = await this.getMonthYear(firstDate);

		// Function to click the previous button in the calendar until the correct month/year is displayed
		const clickPrevBtn = async () => {
			await this.page.waitForTimeout(1000);
			const currentMonthElement = this.page.locator(
				"//div[contains(@class,'MuiGrid-root MuiGrid-container MuiGrid-grid-xs-')]/div[2]/div/div"
			);
			const currentMonthText =
				(await currentMonthElement.textContent()) ?? '';
			const [month, year] = currentMonthText.split(' ');
			const currentMonthAfterSplit = `${month.slice(0, 3)} ${year}`;

			if (!monthYearOfStartDates.includes(currentMonthAfterSplit)) {
				await (await this.backButtonInCalender()).click();
				await clickPrevBtn();
			}
		};

		// Click the previous button if necessary
		await clickPrevBtn();

		// Wait for the required time
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Return the reversed and retrieved dates
		return {
			startreversedDateReceived,
			endreversedDateReceived,
			firstDate,
			secondDate
		};
	}

	// select a specified date only
	// choose start and end date using custom date filter..here we are selecting Week to date using custom
	async clickSpecificStartAndEndDate(
		weekToDateInList: any,
		customFromDateFilter: any
	) {
		let getText = 'Apr 20, 2024 - Apr 26, 2024';
		let endreversedDateReceived: string;
		let startreversedDateReceived: string;

		// Get the week to date and click on custom menu button
		await this.performanceElements
			.calenderFilterBtn(customFromDateFilter)
			.click();

		// Split the date from getText
		const dates = await this.splitDate(getText);
		const firstDateRetrieved = dates.firstDate;
		const secondDateRetrieved = dates.secondDate;

		// Format and reverse the first date
		const firstDateNumeric = await this.formatDate(firstDateRetrieved);
		startreversedDateReceived = await this.reverseDate(firstDateNumeric);

		// Format and reverse the second date
		const secondDateNumeric = await this.formatDate(secondDateRetrieved);
		endreversedDateReceived = await this.reverseDate(secondDateNumeric);

		// Convert the received date string to a Date object
		const targetDate = new Date(startreversedDateReceived);

		// Define the start of the week (January 27th, 2024 in this case)
		const weekStart = new Date(2024, 0, 27);

		// Calculate the number of days between the start of the week and the target date
		const daysDifference = Math.floor(
			(targetDate.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000)
		);
		// Calculate the week number
		const startDateWeekNumber = Math.ceil((daysDifference + 5) / 7);

		// Calculate for the second date
		const secondTargetDate = new Date(endreversedDateReceived);
		const secondYearStart = new Date(secondTargetDate.getFullYear(), 0, 1);
		const secondDaysDifference = Math.floor(
			(secondTargetDate.getTime() - secondYearStart.getTime()) /
				(24 * 60 * 60 * 1000)
		);
		const secondStartDateWeekNumber =
			Math.floor(secondDaysDifference / 7) + 1;

		// Click the forward button in the calendar
		await (await this.forwardButtonInCalender()).click();

		// Get the month and year of the first date
		const monthYearOfStartDates = await this.getMonthYear(
			firstDateRetrieved
		);

		// Function to click the previous button in the calendar until the correct month/year is displayed
		const clickPrevBtn = async () => {
			await this.page.waitForTimeout(1000);
			const currentMonthElement = this.page.locator(
				"//div[contains(@class,'MuiGrid-root MuiGrid-container MuiGrid-grid-xs-')]/div[3]/div/div"
			);
			const currentMonthText = await currentMonthElement.innerText();
			const [month, year] = currentMonthText.split(' ');
			const currentMonthAfterSplit = `${month.slice(0, 3)} ${year}`;

			if (!monthYearOfStartDates.includes(currentMonthAfterSplit)) {
				await (await this.backButtonInCalender()).click();
				await clickPrevBtn();
			}
		};

		// Click the previous button if necessary
		await clickPrevBtn();

		// Wait for the required time
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Click the specific week number element
		await this.page
			.locator(`//*[@id='week-${startDateWeekNumber}']`)
			.click();

		// Return the reversed and retrieved dates
		return {
			startreversedDateReceived,
			endreversedDateReceived,
			firstDateRetrieved,
			secondDateRetrieved
		};
	}

	// //xpath back button < in calender
	async backButtonInCalender() {
		return this.performanceElements.calenderBackBtn();
	}

	// // format date in the form like JAN 08,2023 to 01-08-2023
	async formatDate(dateValue: string | number | Date) {
		const date = new Date(dateValue);
		const formattedDate = date
			.toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			.replace(/\//g, '-');
		return formattedDate;
	}
	// split the two different dates from hyphen
	async splitDate(dateValue: string) {
		const hyphenIndex = dateValue.indexOf('-');
		const firstDate = dateValue.slice(0, hyphenIndex);
		const secondDate = dateValue.slice(hyphenIndex + 1);
		return { firstDate, secondDate };
	}

	// reverse date like 01-08-2023 to 2023-08-01
	async reverseDate(dateValue: string) {
		const parts = dateValue.split('-');
		const year = parts[2].trim();
		const month = parts[1].trim();
		const day = parts[0].trim();
		const reversedDate = `${year}-${month}-${day}`;
		return reversedDate;
	}

	// get month and year
	async getMonthYear(dateReceived: string | number | Date) {
		const date = new Date(dateReceived);
		const month = date.toLocaleString('default', { month: 'short' });
		const year = date.getFullYear();
		const formattedDate = `${month} ${year}`;
		return formattedDate;
	}

	// verification for no of platform selected
	async selectPlatformsSelected(numbers: any) {
		return this.performanceElements.numOfPlatformSelected(numbers);
	}

	// to select web/app platform
	async clickAppWeb(platform: any) {
		return this.performanceElements.selectWebOrApp(platform);
	}

	// validate no data visible message
	async validateNoData() {
		await expect(this.page.locator('body')).toContainText(
			'There is not enough data to draw this chart!'
		);
		await expect(
			this.performanceElements.getDataVisibilityCheckBillBoardChart()
		).not.toBeVisible();
	}
	// get the text of metrics from billboard
	async getChartsTexts() {
		const text = await this.performanceElements
			.getDataVisibilityCheckBillBoardChart()
			.innerText();

		return { text };
	}

	//get upc count
	async upcCount() {
		const text = await this.performanceElements.upcCount().innerText();
		return { text };
	}
	// department and category filter
	async verifyDeptAndCatFilter() {
		return this.performanceElements.getDeptCategoryFilter();
	}

	// department and category dialog
	async verifyDeptCatPopUpDialog() {
		return this.performanceElements.getDeptAndCategoryDialogue();
	}

	// check the first category is selected
	async checkFirstCategorySelected() {
		return this.performanceElements.firstCategorySelectedXpath();
	}

	// uncheck/check a department
	async checkUncheckADepartment(departmentNo: number) {
		return this.performanceElements.departmentExpandCollapseFilter();
	}

	// category hirarchy filters appears or not
	async checkcategoryHirarchyAppearsDissapears() {
		return this.performanceElements.categoryHirarchyDialogue();
	}
	// select date and category
	async selectDateAndCategory(lastWeekNumberInList: string) {
		await this.dateFilterIcon().click();
		//click on last week
		await this.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
	}

	// get category selected and verify from dept and category filter that selected category is applied correctly
	async checkSelectedCategoryIsApplied(categoryNum: string) {
		await (await this.verifyDeptAndCatFilter()).click();
		const text = await this.performanceElements
			.categorySelectedFromFilter(categoryNum)
			.innerText();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
		let convertedText = text.split(' ').slice(1).join(' ').toUpperCase();
		convertedText = convertedText
			.toLowerCase()
			.split(' ')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		await this.performanceElements
			.categoryAppliedInCategoryFilter()
			.scrollIntoViewIfNeeded();
		await expect(
			this.performanceElements.categoryAppliedInCategoryFilter()
		).toBeVisible();

		// Verify that the applied category contains the converted text
		await expect(
			this.performanceElements.categoryAppliedInCategoryFilter()
		).toContainText(convertedText);

		// Extract the number from the original text
		let numberText = text.match(/\d+/)?.[0];

		return { text: numberText, convertedText };
	}

	// check selected category is not applied when user selected a category and clicked on cancel button
	async checkSelectedCategoryIsNotApplied(categoryNum: string) {
		await this.performanceElements
			.categorySelectedFromFilter(categoryNum)
			.click();
		const text = await this.performanceElements
			.categorySelectedFromFilter(categoryNum)
			.innerText();

		await this.page.locator('button', { hasText: 'Cancel' }).click();
		const convertedText = text.split(' ').slice(1).join(' ').toUpperCase();

		await expect(
			this.performanceElements.categoryAppliedInCategoryFilter()
		).not.toContainText(convertedText);
	}

	// expand collapse button
	async expandCollapseBtnDepartment() {
		return this.performanceElements.expandCollapseBtn();
	}

	// click on billboard menus
	async clickBillBoardMenus(menuPosition: any) {
		return this.performanceElements.billboardMenu(menuPosition);
	}
	// check the menu items of billboard List
	async checkMenuButtonLabels() {
		const expectedLabels = [
			'Product Detail Page Views (PDP)',
			'Add to Cart Count',
			'Purchase Count',
			'Session Purchase Rate (%)',
			'Session PDP View Rate (%)',
			'Session Add to Cart Rate (%)',
			'PDP View Session Share',
			'Add to Cart Session Share',
			'Purchase Session Share'
		];
		const buttons = await this.performanceElements
			.billboardMenuOption()
			.all();

		for (let index = 0; index < buttons.length; index++) {
			const buttonText = await buttons[index].innerText();
			const expectedLabel = expectedLabels[index];
			// Compare the button text with the expected label
			expect(buttonText.trim()).toBe(expectedLabel);
		}
	}

	// click hod metrics filter
	async clickDOWHODFilterMenus() {
		return this.performanceElements.dowHodFilter();
	}
	// check the menu items of HOD/DOW List
	async checkMenuButtonLabelsForHODAndDOW() {
		const expectedLabels = ['PDP views', 'Add to cart', 'Purchase'];
		const buttons = await this.performanceElements
			.billboardMenuOption()
			.all();

		for (let index = 0; index < buttons.length; index++) {
			const buttonText = await buttons[index].innerText();
			const expectedLabel = expectedLabels[index];
			// Compare the button text with the expected label
			expect(buttonText.trim()).toBe(expectedLabel);
		}
	}

	// category hirarchy side
	async categoryHirarchyBox() {
		return this.performanceElements.categoryHirarchyPortion();
	}

	// session conversion chart visibility
	async sessionConversionChart() {
		return this.performanceElements.ConversionChartMetrics('Product Views');
	}

	// session conversion chart metrics session add to cart rate and purchase rate visibility
	async sessionConversionChartMetrics2And3() {
		await expect(
			this.performanceElements.ConversionChartMetrics('PDP View Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('Add to Cart Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From PDP')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From non-PDP')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('Purchase Rate')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From AtC')
		).toBeVisible();
		await expect(
			this.performanceElements.ConversionChartMetrics('From non-AtC')
		).toBeVisible();
	}

	// see details link conversion chart
	async seeDetailsLink() {
		return this.performanceElements.seeDetailsSessionConvLink();
	}

	// select any of the billboard metrics
	async clickBillBoardMenu(metrics: any) {
		return this.performanceElements.selectBillboardMetrics(metrics);
	}
	// get metrics value from billboard
	async getBillboardMetrics() {
		const text = await this.performanceElements
			.getMetricsValueBillboard()
			.innerText();
		return { text };
	}

	// // get second metrics value from billboard
	async getSecondBillboardMetrics() {
		const text = await this.performanceElements
			.getSecondMetricsValueBillboard()
			.innerText();
		return { text };
	}

	// values check from conversion
	async getMetricsValueForConversionFromchart(pos: any) {
		const text = await this.performanceElements
			.getAnyMetricsValueForConversionFromchart(pos)
			.innerText();
		return { text };
	}

	//get selected date from date filter
	async datesFromFilter(weekToDateInList: string) {
		let endreversedDateReceived;
		let startreversedDateReceived;

		// Click on the date filter icon
		await this.dateFilterIcon().click();

		// Get the date text from the specified week in the list
		const getText = await this.page
			.locator(
				`//li[@class='MuiListItem-root'][${weekToDateInList}]//div[@class='MuiListItemText-root MuiListItemText-multiline']/p`
			)
			.innerText();

		// Split the date
		const dates = await this.splitDate(getText);
		const firstDateRetrieved = dates.firstDate;
		const secondDateRetrieved = dates.secondDate;

		// Format and reverse the first date
		const startDateNumeric = await this.formatDate(firstDateRetrieved);
		startreversedDateReceived = await this.reverseDate(startDateNumeric);

		// Format and reverse the second date
		const endDateNumeric = await this.formatDate(secondDateRetrieved);
		endreversedDateReceived = await this.reverseDate(endDateNumeric);

		// Return the reversed dates
		return {
			startreversedDateReceived,
			endreversedDateReceived
		};
	}

	// verify session conversion tooltip
	async verifySessionConvChartMetricsForCategory(
		lastWeekNumberInList: string,
		metricsToCheck: string,
		metricsPositionInConversionChart: string,
		menuPosition: string
	) {
		const { startreversedDateReceived, endreversedDateReceived } =
			await this.datesFromFilter(lastWeekNumberInList);
		await this.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await (await this.checkUncheckADepartment(1)).click();
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
		await (await this.clickBillBoardMenus(menuPosition)).click();
		await (await this.clickBillBoardMenu(metricsToCheck)).click();
		const metricsValue = await this.getBillboardMetrics();
		const metrics = await this.getMetricsValueForConversionFromchart(
			metricsPositionInConversionChart
		);
		expect(metricsValue.text).toContain(metrics.text);
	}

	// get billboards any menu data
	// async getBillboardMenus(metricsValue: any, menuPosition: any) {
	// 	//click on billboard menu button
	// 	await this.clickBillBoardMenus(menuPosition).click();
	// 	await this.clickBillBoardMenu(metricsValue).click();
	// 	return this.getBillboardMetrics().then(
	// 		(metricsvalue: { text: any }) => {
	// 			let val = metricsvalue.text;
	// 			return cy.wrap({ val });
	// 		}
	// 	);
	// }
	// verify session conversion tooltip
	// async verifySessionConvChartMetricsForUpc(
	// 	lastWeekNumberInList: any,
	// 	minWaitTime: any,
	// 	metricsToCheck: any,
	// 	metricsPositionInConversionChart: any,
	// 	menuPosition: any
	// ) {
	// 	this.datesFromFilter(lastWeekNumberInList, minWaitTime).then(
	// 		(dates: {
	// 			startreversedDateReceived: any;
	// 			endreversedDateReceived: any;
	// 		}) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			this.clickWeekNumbersList(lastWeekNumberInList).click();
	// 			this.dateFilterApplyBtnClick();
	// 			//click on billboard menu button
	// 			this.clickBillBoardMenus(menuPosition).click();
	// 			this.clickBillBoardMenu(metricsToCheck).click();
	// 			this.getBillboardMetrics().then(
	// 				(metricsValue: { text: any }) => {
	// 					this.getMetricsValueForConversionFromchart(
	// 						metricsPositionInConversionChart
	// 					).then((metrics: { text: any }) => {
	// 						expect(metricsValue.text).to.contain(metrics.text);
	// 					});
	// 				}
	// 			);
	// 		}
	// 	);
	// }

	// donut chart visibility
	async donutChartPresence() {
		return this.performanceElements.donutChart();
	}

	// check donut chart metrics name
	async checkDonutMetrics(metricsName: any) {
		return this.performanceElements.donutMetrics(metricsName);
	}

	// see details link sot chart
	async seeDetailsLinkSOTChart() {
		return this.performanceElements.sotDetails();
	}

	// see sot detials page
	async sotDetails() {
		return this.performanceElements.sotDetailsPageVisibility();
	}

	// session share chart visibility
	async sessionshareChartPresence() {
		return this.performanceElements.sessionShareChart();
	}

	// see details link session share chart
	async seeDetailsLinkSessionShareChart() {
		return this.performanceElements.sessionShareSeeDetails();
	}

	// session share dropdown
	async sessionShareDropdown(filter: any) {
		return this.performanceElements.sessionShareDropdown(filter);
	}

	// session share menu item selection / dow/hod menu item selection
	async selectMenu(filter: any) {
		return this.performanceElements.sessionShareMenuItm(filter);
	}

	// verify visibility of day of the week chart
	async verifyvisibilityDayOfTheWeekChart() {
		return this.performanceElements.DayOfWeekChart();
	}

	// verify visibility of day of the week or hour of the day filter
	async verifyvisibilityOfHODorDOWFilter(filter: any) {
		return this.performanceElements.visibilityOfHODorDOWFilter(filter);
	}

	// check visibility of date range in DOW filter
	async checkDateRangeFilterFrmDOWChart(WeekDateRange: any) {
		return this.performanceElements.visibilityOfDateRangeFromDOW(
			WeekDateRange
		);
	}

	// page/atc/purchase selection filter in DOW
	async pageAtcPurchaseSelectionFiltr(filter: any) {
		return this.performanceElements.pageAtcPurchaseSelectionFilter(filter);
	}

	// verify legend below DOW chart
	async legendsBelowDOWHODChart(filter: any) {
		return this.performanceElements.legendBelowHODDOWFilter(filter);
	}

	// click hour of day
	async hodLink() {
		return this.performanceElements.hodChartLink();
	}

	// select last week date and ctageory
	async selectLastWeekDtAndCategory(lastWeekNumberInList: string) {
		await this.dateFilterIcon().click();
		await this.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await (await this.checkUncheckADepartment(1)).click();
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
	}

	// upc button on home page
	async checkAndClickOnUpcBtn() {
		return this.performanceElements.upcBtn();
	}

	// upc clear and confirm button are disabled initially
	async checkInitiallyUpcClearConfirmBtnDisabled() {
		await expect(this.performanceElements.upcClearBtn()).toBeVisible();
		await expect(this.performanceElements.upcConfirmBtn()).toBeVisible();
	}

	//paste upcs
	async pasteUpcs(aUpc: string) {
		await (await this.checkAndClickOnUpcBtn()).click();

		const searchInput = this.performanceElements.upcPaste();
		await searchInput.fill(aUpc); // Fill the input field with the UPC
		await searchInput.press('Enter'); // Simulate pressing Enter
	}

	// paste upcs text box
	async pasteUpcTextArea(Upcs: any) {
		const search = await this.performanceElements.upcPasteArea();
		await search.fill(Upcs);
		await search.press('Enter');
	}

	// check pasted upc
	async pastedUpcCheck(aUpc: any) {
		return this.performanceElements.pastedUpc(aUpc);
	}

	// verify category filter is enabled if upcs are removed
	async checkCategoryFilterDisabled() {
		return (await this.categoryDisabledFilter()).isHidden();
	}

	// confirm upc btn
	async ConfirmBtnUpc() {
		return this.performanceElements.confirmUpcBtn();
	}

	// verify category filter which will be disabled on upc selection
	async categoryDisabledFilter() {
		return this.performanceElements.disabledCategoryBtn();
	}

	// to check upc error message and remove all error button
	async verifyErrorMessgae(filter: any) {
		return this.performanceElements.upcErrMsg(filter);
	}

	// clear upc
	async ClearBtnUpc() {
		return this.performanceElements.clearBtnUPC();
	}

	// text filed upc
	async upcTextField(upc: any) {
		return this.performanceElements.textFieldUpc(upc);
	}

	// confirm button which will be disabled on wrong upc selection
	async confirmButtonDisabled() {
		return this.performanceElements.disableUpcConfirmBtn();
	}

	// dataset button
	async datasetBtn() {
		return this.performanceElements.dataSetBtn();
	}

	// dataset menu
	async datasetMenus(filter: any) {
		return this.performanceElements.datasetMenuItem(filter);
	}

	// verify message
	async verifyMessage() {
		return this.performanceElements.messageDownload();
	}
	// download button dataset
	async downloadButton() {
		return this.performanceElements.download();
	}

	// verify download model
	async downloadModelVisibility(filter: any) {
		await expect(
			this.performanceElements.datasetDownloadModel()
		).toBeVisible();
		await expect(
			this.performanceElements.labelDownloadModel(filter)
		).toBeVisible();
		await expect(this.performanceElements.messageDownload()).toBeVisible();
	}
	// click week filter
	async clickWeekFilter(weekList: any) {
		return this.performanceElements.weekFilter(weekList).click();
	}
	// get department number
	async getDepartmentNumber() {
		const text = await this.performanceElements
			.getDepartment('1')
			.innerText();
		const numberExtracted = parseInt(text);
		return { numberExtracted };
	}

	// FIXME:
	//billboard data check with api
	// billboardWithAPI(
	// 	url: string,
	// 	lastWeekNumberInList: any,
	// 	minWaitTime: any,
	// 	metricsToCheck: any,
	// 	menuPosition: any
	// ) {
	// 	return this.datesFromFilter(lastWeekNumberInList, minWaitTime).then(
	// 		(dates: {
	// 			startreversedDateReceived: any;
	// 			endreversedDateReceived: any;
	// 		}) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			cy.log(dateStart);
	// 			this.clickWeekFilter(lastWeekNumberInList);
	// 			this.dateFilterApplyBtnClick();
	// 			this.verifyDeptAndCatFilter({ timeout: minWaitTime }).click();
	// 			cy.contains('button', 'Confirm').click();
	// 			//get text of category selected and verify that category is selected i
	// 			this.checkSelectedCategoryIsApplied(1).then(
	// 				(category: { text: any }) => {
	// 					this.verifyDeptAndCatFilter({
	// 						timeout: minWaitTime
	// 					}).click();
	// 					this.getDepartmentNumber().then(
	// 						(departNum: { numberExtracted: any }) => {
	// 							cy.contains('button', 'Confirm').click();
	// 							this.page
	// 								.locatorCompanyId(url)
	// 								.then((cmpanyId: any) => {
	// 									let compnyId = cmpanyId;
	// 									let categoryNbr = category.text;
	// 									let dNum = departNum.numberExtracted;
	// 									//click on billboard menu button
	// 									this.clickBillBoardMenus(
	// 										menuPosition
	// 									).click();
	// 									this.clickBillBoardMenu(
	// 										metricsToCheck
	// 									).click();
	// 									if (
	// 										url ==
	// 										'https://stg.walmartluminate.com/digitallandscapes/'
	// 									) {
	// 										cy.intercept(billboardStg).as(
	// 											'billboard'
	// 										);
	// 									} else if (
	// 										url ==
	// 										'https://www.walmartluminate.com/digitallandscapes/'
	// 									) {
	// 										cy.intercept(billboardProd).as(
	// 											'billboard'
	// 										);
	// 									} else {
	// 										cy.intercept(billboard).as(
	// 											'billboard'
	// 										);
	// 									}
	// 									this.page
	// 										.locatorCookie('LUMINATE_TOKEN')
	// 										.then((cookie: { value: any }) => {
	// 											const luminationToken = cookie
	// 												? cookie.value
	// 												: null;
	// 											let header =
	// 												new ApiHeaders().getHeadersAndCookies(
	// 													url,
	// 													luminationToken
	// 												);
	// 											categoryNbr =
	// 												categoryNbr.split(' ')[0];
	// 											let billboardPayload =
	// 												new ApiPayloads().getPayloadBillboardTerm(
	// 													dateStart,
	// 													dateEnd,
	// 													dNum +
	// 														'_' +
	// 														categoryNbr,
	// 													compnyId
	// 												);
	// 											if (
	// 												url ==
	// 												'https://stg.walmartluminate.com/digitallandscapes/'
	// 											) {
	// 												cy.request({
	// 													method: 'POST',
	// 													url: billboardStg,
	// 													headers: header,
	// 													body: billboardPayload
	// 												}).then(
	// 													(response: {
	// 														body: any[];
	// 													}) => {
	// 														const metricsReceivedFromApi =
	// 															response.body.find(
	// 																(item: {
	// 																	title: any;
	// 																}) =>
	// 																	item.title ===
	// 																	metricsToCheck
	// 															);
	// 														this.getBillboardMetrics().then(
	// 															(metricsValue: {
	// 																text: any;
	// 															}) => {
	// 																cy.wait(
	// 																	minWaitTime
	// 																);
	// 																expect(
	// 																	metricsValue.text
	// 																).to.contain(
	// 																	metricsReceivedFromApi.value
	// 																);
	// 															}
	// 														);
	// 													}
	// 												);
	// 											} else if (
	// 												url ==
	// 												'https://www.walmartluminate.com/digitallandscapes/'
	// 											) {
	// 												cy.request({
	// 													method: 'POST',
	// 													url: billboardProd,
	// 													headers: header,
	// 													body: billboardPayload
	// 												}).then(
	// 													(response: {
	// 														body: any[];
	// 													}) => {
	// 														const metricsReceivedFromApi =
	// 															response.body.find(
	// 																(item: {
	// 																	title: any;
	// 																}) =>
	// 																	item.title ===
	// 																	metricsToCheck
	// 															);
	// 														this.getBillboardMetrics().then(
	// 															(metricsValue: {
	// 																text: any;
	// 															}) => {
	// 																cy.wait(
	// 																	minWaitTime
	// 																);
	// 																expect(
	// 																	metricsValue.text
	// 																).to.contain(
	// 																	metricsReceivedFromApi.value
	// 																);
	// 															}
	// 														);
	// 													}
	// 												);
	// 											} else {
	// 												cy.request({
	// 													method: 'POST',
	// 													url: billboard,
	// 													headers: header,
	// 													body: billboardPayload
	// 												}).then(
	// 													(response: {
	// 														body: any[];
	// 													}) => {
	// 														const metricsReceivedFromApi =
	// 															response.body.find(
	// 																(item: {
	// 																	title: any;
	// 																}) =>
	// 																	item.title ===
	// 																	metricsToCheck
	// 															);
	// 														this.getBillboardMetrics().then(
	// 															(metricsValue: {
	// 																text: any;
	// 															}) => {
	// 																expect(
	// 																	metricsValue.text
	// 																).to.contain(
	// 																	metricsReceivedFromApi.value
	// 																);
	// 															}
	// 														);
	// 													}
	// 												);
	// 											}
	// 										});
	// 								});
	// 						}
	// 					);
	// 				}
	// 			);
	// 		}
	// 	);
	// }
	async billboardWithAPI(
		lastWeekNumberInList: string,
		metricsToCheck: string,
		menuPosition: number
	) {
		// Get the start and end dates
		const dates = await this.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		// Apply week filter and department/category selection
		await this.clickWeekFilter(lastWeekNumberInList);
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();

		// Check selected category and proceed
		const category = await this.checkSelectedCategoryIsApplied('1');
		await (await this.verifyDeptAndCatFilter()).click();

		// Get department number
		const departNum = await this.getDepartmentNumber();
		await this.page.click('button:has-text("Confirm")');

		// Get company ID
		const companyId = await this.getCompanyId();
		let compnyId = companyId;
		let categoryNbr = category.text;
		let dNum = departNum.numberExtracted;

		// Click on the required billboard menu
		await (await this.clickBillBoardMenus(menuPosition)).click();
		await (await this.clickBillBoardMenu(metricsToCheck)).click();

		// Set up API intercept for the billboard request based on URL
		let apiUrl = await this.getBillboardAPIURL();

		// Get LUMINATE_TOKEN cookie
		const cookie = await this.page.context().cookies();
		const cookieString = cookie.reduce((acc,curr) =>{
			return `${acc} ${curr.name}=${curr.value};`},'')
		// Prepare API headers and payload
		const header = await this.getHeadersAndCookies(cookieString);
		categoryNbr = categoryNbr?.split(' ')[0];
		const billboardPayload = this.getPayloadBillboardTerm(
			dateStart,
			dateEnd,
			dNum + '_' + categoryNbr,
			compnyId
		);

		// Send the POST request and verify metrics
		const response = await this.page.request.post(apiUrl, {
			headers: header,
			data: billboardPayload
		});
		const responseBody = await response.json();
		const metricsReceivedFromApi = responseBody.find(
			(item: any) => item.title === metricsToCheck
		);

		// Get the metrics displayed on the page

		// Assert that the metrics match
		expect( await this.performanceElements.getFullMetricsValueBillboard('1').allInnerTexts()).toContain(metricsReceivedFromApi.title);
	}

	// for upcs verify billboard data
	// checkBillBoardDataUpc(
	// 	aUpc: any,
	// 	url: string,
	// 	lastWeekNumberInList: any,
	// 	minWaitTime: any,
	// 	metricsToCheck: any,
	// 	menuPosition: any
	// ) {
	// 	this.datesFromFilter(lastWeekNumberInList, minWaitTime).then(
	// 		(dates: {
	// 			startreversedDateReceived: any;
	// 			endreversedDateReceived: any;
	// 		}) => {
	// 			let dateStart = dates.startreversedDateReceived;
	// 			let dateEnd = dates.endreversedDateReceived;
	// 			this.clickWeekFilter(lastWeekNumberInList);
	// 			cy.wait(minWaitTime);
	// 			this.dateFilterApplyBtnClick();
	// 			this.checkAndClickOnUpcBtn().click({ timeout: minWaitTime });
	// 			this.pasteUpcs(aUpc);
	// 			this.ConfirmBtnUpc().click();
	// 			//click on billboard menu button
	// 			cy.wait(minWaitTime);
	// 			this.clickBillBoardMenus(menuPosition, {
	// 				timeout: 7000
	// 			}).click();
	// 			this.clickBillBoardMenu(metricsToCheck).click();
	// 			if (
	// 				url == 'https://stg.walmartluminate.com/digitallandscapes/'
	// 			) {
	// 				cy.intercept(billboardStg).as('billboard');
	// 			} else if (
	// 				url == 'https://www.walmartluminate.com/digitallandscapes/'
	// 			) {
	// 				cy.intercept(billboardProd).as('billboard');
	// 			} else {
	// 				cy.intercept(billboard).as('billboard');
	// 			}
	// 			this.page
	// 				.locatorCookie('LUMINATE_TOKEN')
	// 				.then((cookie: { value: any }) => {
	// 					const luminationToken = cookie ? cookie.value : null;
	// 					let header = new ApiHeaders().getHeadersAndCookies(
	// 						url,
	// 						luminationToken
	// 					);
	// 					this.page
	// 						.locatorCompanyId(url)
	// 						.then((cmpanyId: any) => {
	// 							let billboardPayload =
	// 								new ApiPayloads().getPayloadBillboardTermForUpc(
	// 									dateStart,
	// 									dateEnd,
	// 									aUpc,
	// 									cmpanyId
	// 								);
	// 							if (
	// 								url ==
	// 								'https://stg.walmartluminate.com/digitallandscapes/'
	// 							) {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: billboardStg,
	// 									headers: header,
	// 									body: billboardPayload
	// 								}).then((response: { body: any[] }) => {
	// 									const sessionPdpViewRate =
	// 										response.body.find(
	// 											(item: { title: any }) =>
	// 												item.title ===
	// 												metricsToCheck
	// 										);
	// 									this.getBillboardMetrics().then(
	// 										(metricsValue: { text: any }) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate.value
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
	// 									url: billboardProd,
	// 									headers: header,
	// 									body: billboardPayload
	// 								}).then((response: { body: any[] }) => {
	// 									const sessionPdpViewRate =
	// 										response.body.find(
	// 											(item: { title: any }) =>
	// 												item.title ===
	// 												metricsToCheck
	// 										);
	// 									this.getBillboardMetrics().then(
	// 										(metricsValue: { text: any }) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate.value
	// 											);
	// 										}
	// 									);
	// 								});
	// 							} else {
	// 								cy.request({
	// 									method: 'POST',
	// 									url: billboard,
	// 									headers: header,
	// 									body: billboardPayload
	// 								}).then((response: { body: any[] }) => {
	// 									const sessionPdpViewRate =
	// 										response.body.find(
	// 											(item: { title: any }) =>
	// 												item.title ===
	// 												metricsToCheck
	// 										);
	// 									this.getBillboardMetrics().then(
	// 										(metricsValue: { text: any }) => {
	// 											expect(
	// 												metricsValue.text
	// 											).to.contain(
	// 												sessionPdpViewRate.value
	// 											);
	// 										}
	// 									);
	// 								});
	// 							}
	// 						});
	// 				});
	// 		}
	// 	);
	// }

	// verifyToolTipMessage
	// verifyToolTipMessage(minWaitTime: any) {
	// 	this.performanceElements.dailyHoverText().trigger('mouseover');
	// 	this.performanceElements
	// 		.messageAfterHover({ timeout: minWaitTime })
	// 		.should('be.visible');
	// }

	// date text like Mar 09, 2024
	async getDateFeomCalender(lastWeekNumberInList: string) {
		const getText = await this.performanceElements
			.weekFilter(lastWeekNumberInList)
			.innerText();
		return { getText };
	}

	//tooltip from dow chart
	async tooltipDOW() {
		return this.performanceElements.dowTooltip();
	}
	//date to get from start and end date for hod from filters of hod
	async getStartAndEndDateIntervalHOD(strtdate: Date, enddate: Date) {
		let year = strtdate.getFullYear();
		let month = String(strtdate.getMonth() + 1).padStart(2, '0');
		let day = String(strtdate.getDate()).padStart(2, '0');
		let endDtyear = enddate.getFullYear();
		let endDtmonth = String(enddate.getMonth() + 1).padStart(2, '0');
		let endDtday = String(enddate.getDate()).padStart(2, '0');
		let startDt = `${year}-${month}-${day}`;
		let endDt = `${endDtyear}-${endDtmonth}-${endDtday}`;
		return { startDt, endDt };
	}
	//DOW tooltips to check with api
	async checkTooltipsWithApiDOW(
		lastWeekNumberInList: string,
		hodOrDow: string
	) {
		let interval;
		let tooltipDay;

		const dates = await this.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		await this.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await (await this.checkUncheckADepartment(1)).click();
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		const category = await this.checkSelectedCategoryIsApplied('1');
		await (await this.verifyDeptAndCatFilter()).click();

		const departNum = await this.getDepartmentNumber();
		await this.page.locator('button', { hasText: 'Confirm' }).click();

		const cmpanyIdReceived = await this.getCompanyId();

		let categoryNbr = category.text;
		let departNumber = departNum.numberExtracted;

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		const tooltipButton = this.page.locator(
			"//div[@id='hourly-daily-trend']//div[@role='button']"
		);
		await tooltipButton.hover();
		await tooltipButton.click({ force: true });

		const tooltipContainer = this.page.locator(
			'#hourly-daily-trend .am5-tooltip-container div[role="tooltip"]'
		);
		await tooltipContainer.waitFor();
		const tooltipText = (await tooltipContainer.innerText()).trim();
		let url;
		if (process.env.ENV === 'QA') {
			url = dowStg;
		} else if (process.env.ENV === 'PROD') {
			url = dowProd;
		} else {
			url = dow;
		}

		const cookie = await this.page.context().cookies();
		const luminationToken =
			cookie.find((c) => c.name === 'LUMINATE_TOKEN')?.value ?? '';

		const header = await this.getHeadersAndCookies(luminationToken);

		categoryNbr = categoryNbr?.split(' ')[0];
		let startDate = new Date(dateStart);
		let endDate = new Date(dateEnd);

		const datenumeric = await this.getStartAndEndDateIntervalHOD(
			startDate,
			endDate
		);
		interval = hodOrDow.includes('hod')
			? datenumeric.endDt
			: `${datenumeric.startDt},${datenumeric.endDt}`;

		const AreaPayload = this.getPayloadAreaChart(
			dateStart,
			dateEnd,
			`${departNumber}_${categoryNbr}`,
			interval,
			cmpanyIdReceived
		);

		const response = await this.page.request.post(url, {
			headers: header,
			data: AreaPayload
		});

		tooltipDay = hodOrDow.includes('hod')
			? tooltipText.substring(0, 2)
			: tooltipText.substring(0, 3);

		const jsonResponse = await response.json();

		const pdpCount = jsonResponse.find(
			(item: any) => item.position === tooltipDay
		);

		let ValuePdpCount = pdpCount.pdpViewCount.toString();

		return {
			tooltipText: tooltipText.replace(',', ''),
			ValuePdpCount
		};
	}

	// tooltip from dow chart
	async AvgtooltipDOW() {
		return this.performanceElements.dowAvgTooltip();
	}
	//average DOW tooltips to check with api
	async checkAvgTooltipsWithApiDOW(
		lastWeekNumberInList: string,
		hodOrDow: string
	) {
		let interval;
		let tooltipDay;

		const dates = await this.datesFromFilter(lastWeekNumberInList);
		let dateStart = dates.startreversedDateReceived;
		let dateEnd = dates.endreversedDateReceived;

		await this.clickWeekNumbersList(lastWeekNumberInList).click();
		await this.dateFilterApplyBtnClick();
		await (await this.verifyDeptAndCatFilter()).click();
		await (await this.checkUncheckADepartment(1)).click();
		await (await this.checkUncheckADepartment(1)).click();
		await this.page.locator('button', { hasText: 'Confirm' }).click();
		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		// Get text of category selected and verify that the category is selected
		const category = await this.checkSelectedCategoryIsApplied('1');
		await (await this.verifyDeptAndCatFilter()).click();

		const departNum = await this.getDepartmentNumber();
		await this.page.locator('button', { hasText: 'Confirm' }).click();

		const cmpanyIdReceived = await this.getCompanyId();

		let categoryNbr = category.text;
		let departNumber = departNum.numberExtracted;

		await this.page.waitForTimeout(DEFAULT_TIMEOUT);

		const tooltipButton = this.page.locator(
			"//div[@id='hourly-daily-trend']//div[@role='button']"
		);
		await tooltipButton.hover();
		await tooltipButton.click({ force: true });
		console.log('Hover action triggered');

		const tooltipContainer = this.page.locator(
			'#hourly-daily-trend .am5-tooltip-container div[role="tooltip"]'
		);
		await tooltipContainer.waitFor();
		let tooltipText = (await tooltipContainer.innerText()).trim();

		let url;
		if (process.env.ENV === 'QA') {
			url = dowStg;
		} else if (process.env.ENV === 'PROD') {
			url = dowProd;
		} else {
			url = dow;
		}

		const cookie = await this.page.context().cookies();
		const luminationToken =
			cookie.find((c) => c.name === 'LUMINATE_TOKEN')?.value ?? '';

		const header = await this.getHeadersAndCookies(luminationToken);

		categoryNbr = categoryNbr?.split(' ')[0];
		let startDate = new Date(dateStart);
		let endDate = new Date(dateEnd);

		const datenumeric = await this.getStartAndEndDateIntervalHOD(
			startDate,
			endDate
		);
		interval = hodOrDow.includes('hod')
			? datenumeric.endDt
			: `${datenumeric.startDt},${datenumeric.endDt}`;

		const AreaPayload = this.getPayloadAreaChart(
			dateStart,
			dateEnd,
			`${departNumber}_${categoryNbr}`,
			interval,
			cmpanyIdReceived
		);

		const response = await this.page.request.post(url, {
			headers: header,
			data: AreaPayload
		});

		tooltipDay = hodOrDow.includes('hod')
			? tooltipText.substring(0, 2)
			: tooltipText.substring(0, 3);

		const jsonResponse = await response.json();

		const AvgValuePdpViewCount = jsonResponse.find(
			(item: any) => item.position === tooltipDay
		);
		let AvgValuePdpCount = AvgValuePdpViewCount.avgPdpViewCount.toString();

		tooltipText = tooltipText.replace(',', '');

		return {
			tooltipText,
			AvgValuePdpCount
		};
	}
}
export default PerformancePage;
