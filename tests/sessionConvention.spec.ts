import { test, expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	billboardMetrics1,
	dashboardData,
	heading,
	last13WeekNumberInList,
	last4WeekNumberInList
} from '../shared/const';
import { DEFAULT_TIMEOUT } from '../config';
import { billboard, table } from '../shared/apiEndpoints';

test.describe(
	'Session Conversion Page: verify Session Conversion  page visibility',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('001: check conversion page is displayed after clicking on see link', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			//click on see details link
			await (await perfPage.seeDetailsLink()).click();
			await expect(
				await perfPage.sessionConvPage.SessionOfConversionPage()
			).toBeVisible();
		});
	}
);

test.describe(
	'Session Conversion Page: verify Session Conversion chart scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('002: verify you can go back to performance page and can again come to conversion page', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sessionConvPage.SessionOfConversionPage()
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.redirectToPages(heading)
			).click();
			//click on see details link again
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await expect(
				await perfPage.sessionConvPage.SessionOfConversionPage()
			).toBeVisible();
		});

		test('03: verify session Conversion trend chart has session pdp view rate , Add to Cart Rate , From PDP,From non-PDP,Purchase Rate,,From AtC,From non-AtC matching with billboard', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await page.locator('button', { hasText: 'Confirm' }).click();
			const { text } = await perfPage.getBillboardMenus(
				billboardMetrics1,
				1
			);
			//click on see details link again
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			// verify for a metrics say "Session pdp view rate" matching with billboard values
			const metrics =
				await perfPage.sessionConvPage.verifySessionConvChartMetricsForCategory(
					'1'
				);
			expect(text).toContain(metrics.text);
		});
	}
);

test.describe(
	'Session Conversion Page: verify Session Conversion trend visibility scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('04: verify session Conversion trends chart is visible when daily or weekly is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await expect(
				await perfPage.sessionConvPage.dlyWklyDrpDwn()
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await expect(
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).toBeVisible();

			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'Session Conversion Page: verify Session Conversion trend legends and data with api',
	{ tag: ['@Regression'] },
	() => {
		test('05: verify session conversion trend chart has 3 field Session PDP View Rate,Session ATC Rate, Session Purchase Conversion for daily and weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.seeDetailsLink()).click();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
		});

		test('06: verify user selected daily and a few line chart data for eg. pdp view rate from line char and api to match', async ({
			page
		}) => {
			let intervalSrc = 'Daily';
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.sessionConvPage.checkTooltipSessionConvChart(
				last4WeekNumberInList,
				intervalSrc
			);
		});
	}
);

test.describe(
	'Session Conversion Page: verify Session Conversion count chart visibility',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('07: verify session Conversion count chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountText()
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'Session Conversion Page: verify Session Conversion count chart scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('008: verify user can select via daily and weekly in conversion count chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await expect(
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await expect(
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
		});

		test('009: verify user select daily and weekly in conversion count chart and its visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await expect(
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await expect(
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
		});

		test('010: verify session conversion count chart has 3 field pdpViewCount,atcCount, purchaseCount', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last13WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			//below 2 lines for weekly selection as daily has no data
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'PDP View Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'ATC Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'Purchase Count'
				)
			).toBeVisible();
		});

		test('011: in session conversion count chart: verify user selected daily and a few line chart data for eg. pdp view rate from line chart and api to match', async ({
			page
		}) => {
			let intervalSrc = 'Daily';
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.sessionConvPage.checkTooltipSessionConvCountChart(
				last4WeekNumberInList,
				intervalSrc
			);
		});
	}
);

test.describe(
	'Session Conversion Page: verify after selection of category in Session Conversion Table',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('12: verify session conversion table have proper headers', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await perfPage.waitForAPIResponse(table);

			// Assert that the table headers contain the expected text values
			await perfPage.sessionConvPage.checkTableHeaders('Category');
		});
	}
);

test.describe(
	'Session Conversion Page: verify scenerios for Session Conversion Table after selection of category',
	{ tag: ['@Regression'] },
	() => {
		test('13: verify session conversion table dropdown has by default Category selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			const text = await (
				await perfPage.sessionConvPage.tableFilterButton()
			).innerText();

			expect(text).toContain('Category');
		});

		test('14: verify session conversion table has dropdown values like Category/items', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.tableFilterButton()).click();
			//check items in table menu
			await perfPage.sessionConvPage.checkTableFilter();
		});

		test('15: verify session conversion table for category selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.tableFilterButton()).click();
			//check items in table menu
			await perfPage.sessionConvPage.checkTableFilter();
			await (
				await perfPage.sessionConvPage.SelectFilterInTable('Category')
			).click();
		});

		test('16: verify table has selected category matching with category displayed in table ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			const category = await perfPage.checkSelectedCategoryIsApplied('1');
			let text = category.convertedText.toUpperCase();
			const metric = await perfPage.sessionConvPage.getTableLabelValue(
				'1'
			);
			expect(text).toContain(metric.text);
		});

		test('17: verify table has metrics displayed is matching with api response and selected category', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.sessionConvPage.verifyTableDataWithApi(
				last4WeekNumberInList
			);
		});

		test.skip('18: verify session conversion table brands are displayed after brands selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.tableFilterButton()).click();
			//check items in table menu
			await expect(
				await perfPage.sessionConvPage.SelectFilterInTable('Brand')
			).toBeVisible();

			await (
				await perfPage.sessionConvPage.SelectFilterInTable('Brand')
			).click();
			await perfPage.sessionConvPage.checkDataInTableRows();
		});

		test('19: verify session conversion table items are displayed after item selection from table menu and description tag would be added', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.tableFilterButton()).click();
			//check items in table menu
			await expect(
				await perfPage.sessionConvPage.SelectFilterInTable('Item')
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.SelectFilterInTable('Item')
			).click();
			await perfPage.sessionConvPage.checkDataInTableRows();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.sessionConvPage.checkTableHeaders('Item');
		});

		test('20: verify sorting in session conversion table for category selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.tableFilterButton()).click();
			//check items in table menu
			await perfPage.sessionConvPage.checkTableFilter();
			await (
				await perfPage.sessionConvPage.SelectFilterInTable('Category')
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.sessionConvPage.sortingCheckString();
		});
	}
);

test.describe(
	'For Upc: Session Conversion Page: verify Session Conversion trend chart scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('21: for upc :verify session Conversion trends chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
		});

		test.skip('22: for multiple upcs :verify session Conversion trends chart is visible for daily/weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'For Upc: Session Conversion Page: verify Session Conversion trend chart ',
	{ tag: ['@Regression'] },
	() => {
		test('23:For Upc: verify session conversion trend chart has 3 field Session PDP View Rate,Session ATC Rate, Session Purchase Conversion for daily and weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
		});

		test.skip('24:For multiple Upcs: verify session conversion trend chart has 3 field Session PDP View Rate,Session ATC Rate, Session Purchase Conversion for daily and weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
			await (await perfPage.sessionConvPage.dlyWklyDrpDwn()).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session PDP View Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session ATC Rate'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionTrendChartFields(
					'Session Purchase Conversion'
				)
			).toBeVisible();
		});
	}
);

test.describe(
	'For Upc: Session Conversion Page: verify Session Conversion count chart visibility',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('25: For Upc: verify session Conversion count chart is visible for daily and weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountText()
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
		});

		test('26: For multiple Upcs: verify session Conversion count chart is visible for daily and weekly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountText()
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkSessionConversionCountChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'For Upc: Session Conversion Page: verify Session Conversion count chart scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('27: for upc: verify session conversion count chart has 3 field PDP View Count,ATC Count, Purchase Count', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'PDP View Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'ATC Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'Purchase Count'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'PDP View Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'ATC Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'Purchase Count'
				)
			).toBeVisible();
		});

		test('28: for multiple upcs: verify session conversion count chart has 3 field PDP View Count,ATC Count, Purchase Count', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'PDP View Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'ATC Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'Purchase Count'
				)
			).toBeVisible();
			await (
				await perfPage.sessionConvPage.dlyWklyDrpDwnFromSessnConvCountChart()
			).click();
			await (
				await perfPage.sessionConvPage.dailyWeeklyFromSessionConversionTrend(
					'Weekly'
				)
			).click();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'PDP View Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'ATC Count'
				)
			).toBeVisible();
			await expect(
				await perfPage.sessionConvPage.checkConversionCountChartFields(
					'Purchase Count'
				)
			).toBeVisible();
		});
	}
);

test.describe('For Upc: Session Conversion Page: verify Session Conversion table', () => {
	test('29: verify  for upcs in session conversion table shows no  category  from table menu', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.navigateToDefaultCompany();
		await perfPage.waitForAPIResponse(billboard);
		await perfPage.dateFilterIcon().click();
		//click on last week
		await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.checkAndClickOnUpcBtn()).click();
		if (process.env.ENV === 'PROD') {
			await perfPage.pasteUpcs(dashboardData.upcProd);
		} else {
			await perfPage.pasteUpcs(dashboardData.upc);
		}
		await (await perfPage.ConfirmBtnUpc()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.seeDetailsLink()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.tableFilterButton()).click();
		// check items in table menu
		await perfPage.sessionConvPage.checkTableFilter();
		await expect(
			await perfPage.sessionConvPage.SelectFilterInTable('Category')
		).not.toBeVisible();

		// await perfPage.sessionConvPage.noDataTextTable()
	});
	test.skip('30: verify  for upcs in session conversion table show no data after brands selection from table menu', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.navigateToDefaultCompany();
		await perfPage.waitForAPIResponse(billboard);
		await perfPage.dateFilterIcon().click();
		//click on last week
		await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.checkAndClickOnUpcBtn()).click();
		if (process.env.ENV === 'PROD') {
			await perfPage.pasteUpcs(dashboardData.upcProd);
		} else {
			await perfPage.pasteUpcs(dashboardData.upc);
		}
		await (await perfPage.ConfirmBtnUpc()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.seeDetailsLink()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.tableFilterButton()).click();
		//check items in table menu
		await perfPage.sessionConvPage.checkTableFilter();
		await expect(
			await perfPage.sessionConvPage.SelectFilterInTable('Brand')
		).toBeVisible();
		await (
			await perfPage.sessionConvPage.SelectFilterInTable('Brand')
		).click();
		await perfPage.sessionConvPage.noDataTextTable();
	});
	test('31: verify  for upcs in session conversion table value after items selection from table menu with api', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.navigateToDefaultCompany();
		await perfPage.waitForAPIResponse(billboard);
		if (process.env.ENV === 'PROD') {
			await perfPage.sessionConvPage.checkTableDataWithApi(
				dashboardData.upcProd,
				last4WeekNumberInList
			);
		} else {
			await perfPage.sessionConvPage.checkTableDataWithApi(
				dashboardData.upc,
				last4WeekNumberInList
			);
		}
	});

	test('32: check sorting in table is working for upcs', async ({ page }) => {
		const perfPage = new performancePage(page);
		await perfPage.navigateToDefaultCompany();
		await perfPage.waitForAPIResponse(billboard);
		await perfPage.dateFilterIcon().click();
		//click on last week
		await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.checkAndClickOnUpcBtn()).click();
		if (process.env.ENV === 'PROD') {
			await perfPage.pasteUpcs(dashboardData.upcProd);
			await perfPage.pasteUpcTextArea(dashboardData.upcProd);
		} else {
			await perfPage.pasteUpcs(dashboardData.upc);
			await perfPage.pasteUpcTextArea(dashboardData.upc);
		}
		await (await perfPage.ConfirmBtnUpc()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.seeDetailsLink()).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sessionConvPage.tableFilterButton()).click();
		await (await perfPage.sessionConvPage.tableFilterButton()).click();
		await expect(
			await perfPage.sessionConvPage.SelectFilterInTable('Item')
		).toBeVisible();

		await (
			await perfPage.sessionConvPage.SelectFilterInTable('Item')
		).click();
		await perfPage.sessionConvPage.clickToSort('Item');
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.sessionConvPage.sortingCheck();
	});
});

test.describe(
	'Test hover on the charts and verify tooltip message in conversion charts',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('33: verify the text on tooltip of conversion chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await perfPage.sessionConvPage.verifyToolTipMessage();
		});

		test('34: verify the text on tooltip of conversion trend  chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await perfPage.sessionConvPage.verifyToolTipSessionConvTrendMessage();
		});

		test('35: verify the text on tooltip of conversion count  chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.sessionConvPage.seeDetailsLink()).click();
			await perfPage.sessionConvPage.verifyToolTipSessionConvCountMessage();
		});
	}
);
