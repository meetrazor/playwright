import test, { expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	customFromDateFilter,
	dashboardData,
	heading,
	last13WeekNumberInList,
	last13WeekText,
	last26WeekNumberInList,
	last26WeekText,
	last4WeekNumberInList,
	last4WeekText,
	lastWeekNumberInList,
	lastWeekText,
	PlaformApp,
	PlaformWeb,
	title,
	weekToDateInList,
	weekToDateText
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
			await perfPage.navigateToDefaultCompany();
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
			await perfPage.navigateToDefaultCompany();
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

test.describe(
	'Performance: Test Date Filter Scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('003: check date filter button is enable and is clickable', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await expect(perfPage.dateFilterIcon()).toBeEnabled();
			await perfPage.dateFilterIcon().click();
		});

		test('004: check date filter dialogue opens up when clicked on date filter button ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//check filter popup opens up.
			expect(await perfPage.dateFilterDialogue()).toBeDefined();
		});

		test('005: check by default week to date is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await expect(
				await perfPage.dateFilterDefaultValue(
					dashboardData.dateFilterDefaultValue
				)
			).toBeVisible();
		});

		test('006: check cancel button functionality ', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(last26WeekNumberInList).click();

			const { getSelectedDateFilterDates } =
				await perfPage.verifyDateSelectedWithDateDisplayesOnCalender(
					last26WeekNumberInList
				);
			await (await perfPage.clickCancelBtnDateFilter()).click();
			await expect(await perfPage.dateFilterDialogue()).not.toBeVisible();
			expect(
				perfPage.performanceElements.calenderFilterXpath(
					getSelectedDateFilterDates
				)
			).toBeUndefined();
		});
	}
);

test.describe(
	'Performance: Test Date Filters for last 26, 13, 4 and last weeks,date filter dialogue box and custom date selection',
	{ tag: ['@Regression'] },
	() => {
		test('007: for last 26 weeks: verify text of week selected and date on top of calender dialogue to match with selected date in calender dialogue', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//click on last 26 week
			await perfPage.clickWeekNumbersList(last26WeekNumberInList).click();
			//check dates from last 26 weeks list and verify it with date on top of calender dialogue
			expect(
				await perfPage.checkTextOfWeeksSelected(last26WeekNumberInList)
			).toEqual(last26WeekText);
			const { getCalenderTitleDateText, getSelectedDateFilterDates } =
				await perfPage.verifyDateSelectedWithDateDisplayesOnCalender(
					last26WeekNumberInList
				);
			expect(getCalenderTitleDateText).toContain(
				getSelectedDateFilterDates
			);
		});

		test('008: for last 13 weeks: verify text of week selected and date on top of calender dialogue to match with selected date in calender dialogue', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//click on last 13 week
			await perfPage.clickWeekNumbersList(last13WeekNumberInList).click();
			//check dates from last 13 weeks list and verify it with date above calender
			await perfPage
				.checkTextOfWeeksSelected(last13WeekNumberInList)
				.then((textOfWeekSelected) => {
					expect(textOfWeekSelected).toEqual(last13WeekText);
				});
			await perfPage
				.verifyDateSelectedWithDateDisplayesOnCalender(
					last13WeekNumberInList
				)
				.then((dates) => {
					expect(dates.getCalenderTitleDateText).toContain(
						dates.getSelectedDateFilterDates
					);
				});
		});

		test('009: for last 4 weeks: verify text of week selected and date on top of calender dialogue to match with selected date in calender dialogue', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//click on last 4 week
			await perfPage.clickWeekNumbersList(last4WeekNumberInList).click();
			//check dates from last 4 weeks list and verify it with date above calender
			await perfPage
				.checkTextOfWeeksSelected(last4WeekNumberInList)
				.then((textOfWeekSelected) => {
					expect(textOfWeekSelected).toEqual(last4WeekText);
				});
			await perfPage
				.verifyDateSelectedWithDateDisplayesOnCalender(
					last4WeekNumberInList
				)
				.then((dates) => {
					expect(dates.getCalenderTitleDateText).toContain(
						dates.getSelectedDateFilterDates
					);
				});
		});

		test('010: for last weeks: verify text of week selected and date on top of calender dialogue to match with selected date in calender dialogue', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//click on last week
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			//check dates from last week list and verify it with date above calender
			await perfPage
				.checkTextOfWeeksSelected(lastWeekNumberInList)
				.then((textOfWeekSelected) => {
					expect(textOfWeekSelected).toEqual(lastWeekText);
				});
			await perfPage
				.verifyDateSelectedWithDateDisplayesOnCalender(
					lastWeekNumberInList
				)
				.then((dates) => {
					expect(dates.getCalenderTitleDateText).toContain(
						dates.getSelectedDateFilterDates
					);
				});
		});

		test('011: for week to date : verify text of week to date selected and date on top of calender dialogue to match with selected date in calender dialogue', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			//click on weekToDate week
			await perfPage.clickWeekNumbersList(weekToDateInList).click();
			//check dates from week to date list and verify it with date above calender
			await perfPage
				.checkTextOfWeeksSelected(weekToDateInList)
				.then((textOfWeekSelected) => {
					expect(textOfWeekSelected).toEqual(weekToDateText);
				});
			await perfPage
				.verifyDateSelectedWithDateDisplayesOnCalender(weekToDateInList)
				.then((dates) => {
					expect(dates.getCalenderTitleDateText).toContain(
						dates.getSelectedDateFilterDates
					);
				});
		});

		test('012: check date filter dialogue box shows the current month calender', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			const currentDate = new Date();
			const currentMonth = currentDate.toLocaleString('default', {
				month: 'long'
			});
			//verify the month displayed in calender of date filter
			const currentMonthFromCal = await (
				await perfPage.currentMonthInCalender(currentMonth)
			).innerText();
			expect(currentMonthFromCal).toContain(currentMonth);
		});

		test('013: check custom date selection to be applied correctly', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			//click on date filter button
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();

			await perfPage.dateFilterIcon().click();
			//click customFromDateFilter and verify you can select and apply dates by custom filter
			const { firstDate, secondDate } =
				await perfPage.clickStartAndEndDate(
					lastWeekNumberInList,
					customFromDateFilter
				);
			await perfPage.dateFilterApplyBtnClick();
			const dateVisible = firstDate + '-' + secondDate;
			const modifiedText = dateVisible.replace(
				/(\w{3} \d{1,2}, \d{4})\s*-\s*(\w{3} \d{1,2}, \d{4})/,
				'$1-$2'
			);
			await expect(
				perfPage.performanceElements.calenderFilterXpath(modifiedText)
			).toBeVisible();
		});

		test('014: check custom date selection to be applied correctly for a specific dates applied', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			//click on date filter button
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();

			await perfPage.dateFilterIcon().click();
			//click customFromDateFilter and verify you can select and apply dates by custom filter
			const { firstDateRetrieved, secondDateRetrieved } =
				await perfPage.clickSpecificStartAndEndDate(
					lastWeekNumberInList,
					customFromDateFilter
				);
			await perfPage.dateFilterApplyBtnClick();
			const dateVisible = firstDateRetrieved + '-' + secondDateRetrieved;
			const modifiedText = dateVisible.replace(
				/(\w{3} \d{1,2}, \d{4})\s*-\s*(\w{3} \d{1,2}, \d{4})/,
				'$1-$2'
			);
			await expect(
				perfPage.performanceElements.calenderFilterXpath(modifiedText)
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test Platform filter Scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('015: verify by default both platform are selected i.e all - walmart.com and mobile app', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await expect(
				await perfPage.selectPlatformsSelected('All')
			).toBeVisible();
		});

		test('016: User should be able to select Platform mobile app', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformWeb)).click();
			await expect(
				await perfPage.selectPlatformsSelected('Mobile App')
			).toBeVisible();
		});

		test('017: User should be able to select Platform  Walmart.com ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformApp)).click();
			await expect(
				await perfPage.selectPlatformsSelected('Walmart.com')
			).toBeVisible();
		});

		test('018: Uncheck both the checkbox and verify there is no data message since no platform is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await perfPage.dateFilterApplyBtnClick();
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformWeb)).click();
			await (await perfPage.clickAppWeb(PlaformApp)).click();
			await expect(
				await perfPage.selectPlatformsSelected('Walmart.com')
			).toBeVisible();
			await perfPage.validateNoData();
		});
	}
);
