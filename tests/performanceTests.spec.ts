import test, { expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	dashboardData,
	heading,
	lastWeekNumberInList,
	title
} from '../shared/const';
import { getURL } from '../config';
import { categoryHirarchy } from '../shared/apiEndpoints';

test.describe(
	'Performance Page: verify performance page visibility when logged in and other components visibility',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('001: check performance page is displayed after logging in into the application', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await perfPage.checkPageTitle(title);
			await perfPage.checkPerformancePageVisible(heading);
		});

		test('002: check other components should be visible on performance page', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await perfPage.verifyvisibilityComponentsOnPerformancePage(
				getURL()
			);
		});
	}
);

test.describe('Performance: Test Date Filter Scenerios', () => {
	test('003: check date filter button is enable and is clickable', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.waitForAPIResponse(categoryHirarchy);
		await expect(perfPage.dateFilterIcon()).toBeEnabled();
		await perfPage.dateFilterIcon().click();
	});

	test('004: check date filter dialogue opens up when clicked on date filter button ', async ({
		page
	}) => {
		const perfPage = new performancePage(page);
		await perfPage.waitForAPIResponse(categoryHirarchy);
		await perfPage.dateFilterIcon().click();
		//check filter popup opens up.
		expect(await perfPage.dateFilterDialogue()).toBeVisible();
	});

	test('005: check by default week to date is selected', async ({ page }) => {
		const perfPage = new performancePage(page);
		await perfPage.waitForAPIResponse(categoryHirarchy);
		await perfPage.dateFilterIcon().click();
		await expect(
			await perfPage.dateFilterDefaultValue(
				dashboardData.dateFilterDefaultValue
			)
		).toBeVisible();
	});
});
