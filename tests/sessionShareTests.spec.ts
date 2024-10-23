import { expect, test } from '@playwright/test';
import performancePage from './pages/performancePage';
import { sessionShare } from '../shared/apiEndpoints';
import {
	dashboardData,
	last13WeekNumberInList,
	last4WeekNumberInList,
	sessionShareText
} from '../shared/const';
import SessionSharePage from './pages/sessionSharePage';
import { DEFAULT_TIMEOUT } from '../config';

test.describe(
	'Session share Page: verify session share page visibility and other components in session share chart',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test.skip('001: verify that user can see session share page and verify the path to page link text', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await expect(
				await perfPage.sessionShPage.sessionsharePageText(
					sessionShareText
				)
			).toBeVisible();

			await expect(
				await perfPage.sessionShPage.sessionsharePagePathLinkText(
					sessionShareText
				)
			).toBeVisible();
		});

		test('002: verify that user would see session share Chart in session share page', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await expect(
				await perfPage.sessionShPage.sessionshareChartPresence()
			).toBeVisible();
		});

		test('003: verify that user can see pdp view session share by default and user can select Product page view,add to cart or purchase any from dropdown and corresponding legends will be displayed below chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sessionShPage.sessionshareChartPresence()
			).click();
			await expect(
				await perfPage.sessionShPage.sessionShareDropdown('PDP views')
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'PDP views'
				)
			).toBeVisible();
			// check pdp view visible in legend
			await (
				await perfPage.sessionShPage.sessionShareDropdown('PDP views')
			).click();
			await (
				await perfPage.sessionShPage.selectMenu('Add to cart')
			).click();
			// check add to cart visible in legend
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'Add to cart'
				)
			).toBeVisible();

			await (
				await perfPage.sessionShPage.sessionShareDropdown('Add to cart')
			).click();
			await (await perfPage.sessionShPage.selectMenu('Purchase')).click();
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'Purchase'
				)
			).toBeVisible();
		});
	}
);

test.describe.skip(
	'Session share Page: verify session share data with api response',
	{ tag: ['@Regression'] },
	() => {
		test('004: verify that the sessionshareValuePdp / atc / purchase is matching with the api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			const { tooltipText, pdpSessionShareValue } =
				await perfPage.sessionShPage.checkTooltipsWithApi(
					last4WeekNumberInList
				);
			expect(tooltipText).toContain(pdpSessionShareValue);
		});
	}
);

test.describe.skip(
	'Session Share Page: verify Session Share trend visibility',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('005: verify after daily & weekly selection the Session Share trend chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChart()
			).toBeVisible();

			await (
				await perfPage.sessionShPage.dlyWklyDrpDwnFromSessnShareTrendChart()
			).click();
			await (
				await perfPage.sessionShPage.dailyWeeklyFromSessionShareTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'Session Share Page: verify Session Share trend scenerios',
	{ tag: ['@Regression'] },
	() => {
		test.skip('006: verify for daily and weekly session share trend chart has 3 legends PDP Session Share,ATC Session Share,Purchase Session Share ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'PDP Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'ATC Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'Purchase Session Share'
				)
			).toBeVisible();
			await (
				await perfPage.sessionShPage.dlyWklyDrpDwnFromSessnShareTrendChart()
			).click();
			await (
				await perfPage.sessionShPage.dailyWeeklyFromSessionShareTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'PDP Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'ATC Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'Purchase Session Share'
				)
			).toBeVisible();
		});

		test('007: verify for daily or weekly the value of line charts one of the value for any session share metrics to match with api response', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			const sessionShPage = new SessionSharePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await sessionShPage.checkTooltipSessionShareChart(
				last4WeekNumberInList,
				'Daily'
			);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
		});
	}
);

test.describe(
	'Test table in Session Share detail Page table verification',
	{ tag: ['@Regression'] },
	() => {
		test('008: verify session share table headers', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			//check items in table menu
			await expect(
				await perfPage.sessionShPage.SelectFilterInTable('Item')
			).toBeVisible();
			await (
				await perfPage.sessionShPage.SelectFilterInTable('Item')
			).click();
			await perfPage.sessionShPage.verifyTableHeaders('Item');
		});

		test('009: verify session conversion table has dropdown values like items', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			//check items in table menu
			await perfPage.sessionShPage.checkTableFilter();
		});
		test('010: verify table has selected category matching with category displayed in table ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			let category = await perfPage.checkSelectedCategoryIsApplied('1');
			let categoryNbr = category.text;
			let text = category.convertedText;
			categoryNbr = categoryNbr?.split(' ')[0];
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			text = text.toUpperCase();
			const metricsValue =
				await perfPage.sessionShPage.getTableLabelValue('1');
			expect(text).toContain(metricsValue.text);
		});

		test.skip('011: verify session conversion table brands are displayed after brands selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			//check items in table menu
			await expect(
				await perfPage.sessionShPage.SelectFilterInTable('Brand')
			).toBeVisible();

			await (
				await perfPage.sessionShPage.SelectFilterInTable('Brand')
			).click();
			await perfPage.sessionShPage.checkDataInTableRows();
		});

		test('012: verify session conversion table items are displayed after item selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			//check items in table menu
			await expect(
				await perfPage.sessionShPage.SelectFilterInTable('Item')
			).toBeVisible();
			await (
				await perfPage.sessionShPage.SelectFilterInTable('Item')
			).click();

			await perfPage.sessionShPage.checkDataInTableRows();
			await perfPage.sessionShPage.verifyTableHeaders('Item');
		});

		test('013: verify table has metrics displayed is matching with api response and selected category', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.sessionShPage.verifySessionShareTableWithApi(
				last4WeekNumberInList
			);
		});
	}
);

test.describe(
	'Session Share Page for UPC: verify Session Share trend',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('014: for upc: verify for Daily & Weekly Session Share trend chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last4WeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(dashboardData.upc);
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChart()
			).toBeVisible();
			await (
				await perfPage.sessionShPage.dlyWklyDrpDwnFromSessnShareTrendChart()
			).click();
			await (
				await perfPage.sessionShPage.dailyWeeklyFromSessionShareTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChart()
			).toBeVisible();
		});
		test('015: for UPC verify for daily session share trend chart has 3 field Product page view,ATC Session Share,Purchase Session Share ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last4WeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(dashboardData.upc);
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'PDP views'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'ATC Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'Purchase Session Share'
				)
			).toBeVisible();
		});
		test('016: for UPC verify for weekly session share trend chart has 3 field Product page view,ATC Session Share,Purchase Session Share ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last13WeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(dashboardData.upc);
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await (
				await perfPage.sessionShPage.dlyWklyDrpDwnFromSessnShareTrendChart()
			).click();
			await (
				await perfPage.sessionShPage.dailyWeeklyFromSessionShareTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'PDP views'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'ATC Session Share'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkSessionShareTrendChartFields(
					'Purchase Session Share'
				)
			).toBeVisible();
		});
	}
);
test.describe(
	'Session Share Page for UPC: verify Session Share table scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('017: verify for upc the table has metrics displayed is matching with api response and selected upc', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);

			await perfPage.sessionShPage.verifyTableDataWithAPI(
				last4WeekNumberInList,
				dashboardData.upc
			);
		});

		test('018: for upc: verify session share table when category is selected it should show no data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last4WeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(dashboardData.upc);
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			await expect(
				await perfPage.sessionShPage.SelectFilterInTable('Category')
			).not.toBeVisible();
			// sessionSPage.noDataTextTable()
		});

		test.skip('019: for upc: verify session share table when brands is selected it should show no data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last4WeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.pasteUpcs(dashboardData.upc);
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await (await perfPage.sessionShPage.tableFilterButton()).click();
			//check brand will have no data
			await expect(
				await perfPage.sessionShPage.SelectFilterInTable('Brand')
			).toBeVisible();

			await (
				await perfPage.sessionShPage.SelectFilterInTable('Brand')
			).click();
			await perfPage.sessionShPage.noDataTextTable();
		});
	}
);

test.describe(
	'Test hover on the charts and verify tooltip message',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('020: verify the text on tooltip of session share chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.sessionShPage.verifyToolTipMessage();
		});

		test('021: verify the text on tooltip of session share trend chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectLastWeekDtAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSessionShareChart()).click();
			await perfPage.sessionShPage.verifyShareTrendToolTipMessage();
		});
	}
);
