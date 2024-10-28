import { test, expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	categoryNum1,
	dashboardData,
	donutValuesInternalApp,
	donutValuesInternalNonSearch,
	donutValuesInternalWebNonSearch,
	donutValuesWeb,
	donutValuesWebInternalWebSearch,
	last4WeekNumberInList,
	PlaformWeb
} from '../shared/const';
import {
	categoryHirarchy,
	sotDonut,
	sotlineChart
} from '../shared/apiEndpoints';
import { DEFAULT_TIMEOUT } from '../config';

test.describe(
	'donut: Test SOT Donut chart and see details link',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('001: verify the Donut Chart see details button will be clickable and user will be redirected to sot details page', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(
				await perfPage.sotDonutPage.sotDetails()
			).toBeVisible();
		});

		test('002: verify the Donut Chart have EXTERNAL,Mobile APP - NON-SEARCH,Walmart.com - SEARCH,Walmart.com - NON-SEARCH,Mobile App - SEARCH when web & app both are selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);

			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await expect(
				await perfPage.sotDonutPage.checkDonutMetrics(donutValuesWeb)
			).toBeVisible();
			await expect(
				await perfPage.sotDonutPage.checkDonutMetrics(
					donutValuesInternalNonSearch
				)
			).toBeVisible();
			await expect(
				await perfPage.sotDonutPage.checkDonutMetrics(
					donutValuesInternalApp
				)
			).toBeVisible();
			await expect(
				await perfPage.sotDonutPage.checkDonutMetrics(
					donutValuesInternalWebNonSearch
				)
			).toBeVisible();
			await expect(
				await perfPage.sotDonutPage.checkDonutMetrics(
					donutValuesWebInternalWebSearch
				)
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test SOT trends chart',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('003: verify the source of traffic trends chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await expect(
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).toBeVisible();

			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test SOT trend chart',
	{ tag: ['@Regression'] },
	() => {
		test('004: verify the source of traffic trends chart tooltip', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.sotDonutPage.checkTooltipSotDonutChart(
				last4WeekNumberInList,
				'Daily',
				'allsources'
			);
		});

		test('005: verify the source of traffic trends chart legends when web and app both are selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			// verify legends
			await perfPage.sotDonutPage.checkSotTrendChartsDimensions();
		});

		test('006: verify the source of traffic trends chart legends when app is only selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformWeb)).click();
			//deselect web platfrom
			await perfPage.sotDonutPage.checkSotTrendChartsDimensionsForApp();
		});

		test('007: verify the source of traffic trends chart by default daily and allsources filter selections', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).toBeVisible();
			await expect(
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).toBeVisible();
		});

		test('008: verify the source of traffic trends chart we can select by weekly/daily and allsources/external', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			// verify for daily/ all sources selection chart is visible
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).toBeVisible();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend(
					'Allsources'
				)
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// verify for weekly/ all sources selection chart is visible
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).toBeVisible();

			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// check for external/ daily
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Weekly'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend(
					'External'
				)
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// check for external/weekly
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).click();
		});

		test('009: verify the source of traffic trends chart when external is selected it should show top 5 external sot', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend(
					'External'
				)
			).click();
			await perfPage.sotDonutPage.checkExternalSourceCount();
		});

		test('010: verify the source of traffic trends chart by default has daily and allsources filter selections', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).toBeVisible();
		});
	}
);
test.describe(
	'Performance: Test SOT table Scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('011: verify table headers', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.sotDonutPage.verifyTableHeaders('All Sources');
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('External')
			).click();
			await perfPage.sotDonutPage.verifyTableHeaders('External');
		});

		test.skip('012: verify table has selected category matching with category displayed in table ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Category')
			).click();
			const category = await perfPage.checkSelectedCategoryIsApplied('1');
			let text = category.convertedText;
			text = text.toUpperCase();
			const metricsValue = await perfPage.sotDonutPage.getTableLabelValue(
				'1'
			);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			expect(text).toContain(metricsValue);
		});

		test.skip('013: verify sot table brands are displayed after brands selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Brand')
			).click();
			await perfPage.sotDonutPage.checkDataInTableRows();
		});
		test('014: verify sot table external sot are displayed after external selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('External')
			).click();
			await perfPage.sotDonutPage.checkDataInTableRows();
		});

		test.skip('015: verify sot table items are displayed after item selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Item')
			).click();
			await perfPage.sotDonutPage.checkDataInTableRows();
		});
		test('016: verify sot table all sources are displayed after allsource selection from table menu', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('All Sources')
			).click();
			await perfPage.sotDonutPage.checkDataInTableRows();
		});

		test('017: verify all sources data displayed in table with api response', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await perfPage.sotDonutPage.verifyTableDataWithApiSOT(
				last4WeekNumberInList
			);
		});
	}
);

test.describe.skip(
	'Performance: Test SOT table',
	{ tag: ['@Regression'] },
	() => {
		test('018: verify table has metrics displayed is matching with api response and selected category', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.selectDateAndCategory(last4WeekNumberInList);
			await perfPage.sotDonutPage.verifyTableDataWithApi(
				last4WeekNumberInList
			);
		});
	}
);

test.describe(
	'for upc Test SOT donut and trends chart Scenerios',
	{ tag: ['@Smoke', '@Regression'] },
	() => {
		test('019: for upc: verify sot donut chart is visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.donutChartPresence()
			).toBeVisible();
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await expect(
				await perfPage.sotDonutPage.donutChartPresence()
			).toBeVisible();
		});

		test('020: verify the Donut Chart have EXTERNAL WEB,Mobile APP - NON-SEARCH,Walmart.com - SEARCH,Walmart.com - NON-SEARCH,Mobile App - SEARCH when web & app both are selected for upcs', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await expect(
				await perfPage.checkDonutMetrics(donutValuesWeb)
			).toBeVisible();
			await expect(
				await perfPage.checkDonutMetrics(donutValuesInternalNonSearch)
			).toBeVisible();
			await expect(
				await perfPage.checkDonutMetrics(donutValuesInternalApp)
			).toBeVisible();
			await expect(
				await perfPage.checkDonutMetrics(
					donutValuesInternalWebNonSearch
				)
			).toBeVisible();
			await expect(
				await perfPage.checkDonutMetrics(
					donutValuesWebInternalWebSearch
				)
			).toBeVisible();
		});

		test('021: for upc: verify sot trends chart visible', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
		});
		test('022: for upc: verify the source of traffic trends chart we can select by weekly/daily and allsources/external', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			// verify for daily/ all sources selection chart is visible
			await perfPage.waitForAPIResponse(sotlineChart);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).toBeVisible();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend(
					'Allsources'
				)
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// verify for weekly/ all sources selection chart is visible
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await expect(
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).toBeVisible();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// check for external/ daily
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Weekly'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Daily')
			).click();
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Allsources'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend(
					'External'
				)
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(
				await perfPage.sotDonutPage.sotLineChart()
			).toBeVisible();
			// check for external/weekly
			await (
				await perfPage.sotDonutPage.sotTrendsDefaultDlyAllSrcSelection(
					'Daily'
				)
			).click();
			await (
				await perfPage.sotDonutPage.selectDailyWeeklySOTTrend('Weekly')
			).click();
		});

		test('023: for upc: verify sot trends legends when app & web both are selected when daily and all source are selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			(await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await perfPage.sotDonutPage.checkSotTrendChartsDimensions();
		});

		test('024: for verify the source of traffic trends chart tooltip for daily and all sources filter from trends chart with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			(await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.sotDonutPage.checkTooltipSotDonutChartForUpc(
					last4WeekNumberInList,
					'Daily',
					'allsources',
					dashboardData.upcProd,
					dashboardData.otherUPCSProd
				);
			} else {
				await perfPage.sotDonutPage.checkTooltipSotDonutChartForUpc(
					last4WeekNumberInList,
					'Daily',
					'allsources',
					dashboardData.upc,
					dashboardData.upcs
				);
			}
		});
	}
);
test.describe(
	'for upc: Test SOT table Scenerios',
	{ tag: ['@Regression'] },
	() => {
		test.skip('025: for upc: verify sot table when category is selected it should show no data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Category')
			).click();
			await perfPage.sotDonutPage.noDataTextTable();
		});

		test.skip('026: for upc: verify sot table when brands is selected it should show no data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await perfPage.pasteUpcTextArea(dashboardData.upcProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await perfPage.pasteUpcTextArea(dashboardData.upc);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Brand')
			).click();
			await perfPage.sotDonutPage.noDataTextTable();
		});

		test.skip('027:for upc- verify when upc is selected in global filter and items in table filter it should show that upc in table filter', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
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
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('Item')
			).click();
			const metricsValue = await perfPage.sotDonutPage.getTableLabelValue(
				'1'
			);
			expect(dashboardData.upcs).toContain(metricsValue);
		});

		test.skip('028: for upc- verify when upc is selected in global filter and items in table filter it should show that pdp view in table filter to match with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			if (process.env.ENV === 'PROD') {
				await perfPage.sotDonutPage.verifyTableDataWithApi(
					last4WeekNumberInList,
					dashboardData.upcProd
				);
			} else {
				await perfPage.sotDonutPage.verifyTableDataWithApi(
					last4WeekNumberInList,
					dashboardData.upc
				);
			}
		});

		test('029: for upc- verify  user can select External and table should show data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
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
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('External')
			).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.sotDonutPage.checkDataInTableRows();
		});

		test('030: for upc- verify  user can select all sources and table should show data', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
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
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await (await perfPage.sotDonutPage.tabelMenuButton()).click();
			await (
				await perfPage.sotDonutPage.tableMenuFilterSelect('All Sources')
			).click();
			await perfPage.sotDonutPage.checkDataInTableRows();
		});
	}
);

test.describe(
	'Test hover on the charts and verify tooltip message',
	{ tag: ['@Smoke', '@Regression'] },
	() => {
		test('031: verify the text on tooltip of donut chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.sotDonutPage.verifyToolTipMessage();
		});
		test('032: verify the text on tooltip of donut trend chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.sotDonutPage.seeDetailsLinkSOTChart()
			).click();
			await perfPage.waitForAPIResponse(sotDonut);
			await perfPage.sotDonutPage.verifyToolTipMessageTrendsChart();
		});
	}
);
test.describe('Test sorting', { tag: ['@Smoke', '@Regression'] }, () => {
	test('033: verify the sorting of external sot,pdp views and change', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.navigateToDefaultCompany();
		await perfPage.waitForAPIResponse(sotDonut);
		await perfPage.dateFilterIcon().click();
		await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.dateFilterApplyBtnClick();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sotDonutPage.seeDetailsLinkSOTChart()).click();
		await perfPage.waitForAPIResponse(sotDonut);
		await (await perfPage.sotDonutPage.tabelMenuButton()).click();
		//check items in table menu
		await (
			await perfPage.sotDonutPage.tableMenuFilterSelect('External')
		).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await (await perfPage.sotDonutPage.clickToSort('External')).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.sotDonutPage.sortingCheckString('0');
		await (await perfPage.sotDonutPage.clickToSort('PDP Views')).click();
		await (await perfPage.sotDonutPage.clickToSort('PDP Views')).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.sotDonutPage.sortingCheckString('2');
		await (
			await perfPage.sotDonutPage.clickToSort(
				'Change vs Prev Time Period'
			)
		).click();
		await (
			await perfPage.sotDonutPage.clickToSort(
				'Change vs Prev Time Period'
			)
		).click();
		await page.waitForTimeout(DEFAULT_TIMEOUT);
		await perfPage.sotDonutPage.sortingCheckString('1');
	});
});
