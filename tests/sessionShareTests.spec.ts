import { expect, test } from '@playwright/test';
import performancePage from './pages/performancePage';
import { sessionShare } from '../shared/apiEndpoints';
import { last4WeekNumberInList, sessionShareText } from '../shared/const';
import SessionSharePage from './pages/sessionSharePage';

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
