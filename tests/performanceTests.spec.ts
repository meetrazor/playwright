import test, { expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	billboardMetrics2,
	billboardMetrics7,
	categoryNum1,
	categoryNum2,
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
import { DEFAULT_TIMEOUT, getURL } from '../config';
import { billboard, categoryHirarchy } from '../shared/apiEndpoints';

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

test.describe(
	'Performance: Test Department and category filter Scenerios',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('019: Test department and category filter open up and user can see popuptext, when clicked on department and category filter button', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await expect(await perfPage.verifyDeptAndCatFilter()).toBeVisible();

			await (await perfPage.verifyDeptAndCatFilter()).click();
			await expect(
				await perfPage.verifyDeptCatPopUpDialog()
			).toBeVisible();
		});

		test('020: check first category is checked by default', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await expect(
				await perfPage.checkFirstCategorySelected()
			).toBeVisible();
		});

		test('021: check cancel and confirm button is present in category and departments dialogue and user can click on them to perform actions', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await page.locator('button', { hasText: 'Cancel' }).click();
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await page.locator('button', { hasText: 'Confirm' }).click();
		});

		test('022: check user can select departments and when department is selected then only category hirarchy appears', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkUncheckADepartment(1)).click();
			//verify unchecked the department and category hirarchy disappers
			expect(
				await perfPage.checkcategoryHirarchyAppearsDissapears()
			).toBeUndefined();
			//check department filter again
			//check department filter again
			await (await perfPage.checkUncheckADepartment(1)).click();
			//check hirarchy category selectors
			await expect(
				await perfPage.checkcategoryHirarchyAppearsDissapears()
			).toBeVisible();
		});

		test('023: check user can click on collapse and expand button from department side and collapse will collapse the category and expand will expand the category', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await (await perfPage.expandCollapseBtnDepartment()).click();
			await (await perfPage.expandCollapseBtnDepartment()).click();
			await expect(await perfPage.categoryHirarchyBox()).toBeVisible();
		});

		test('024: check after selecting any category and if user dont want to perform any operation then user can click on cancel and the category will be not applied', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await perfPage.checkSelectedCategoryIsNotApplied(
				categoryNum2.toString()
			);
		});

		test('025: check user can select a category from category selector and that selected category is applied in filter', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			//get text of category selected and verify that category is selected
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
		});
	}
);

test.describe(
	'Performance: Test Billboard is visible correctly',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('026: check billboard is visible', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(await perfPage.clickBillBoardMenus(1)).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test Billboard components and data with api to match',
	{ tag: ['@Regression'] },
	() => {
		test('027: check menu items from billboard list consist of "Session PDP View rate", "Session ATC rate", "Session Purchase Conversion","PDP View Count", "Add to Cart Count", "Purchase Count", "PDP View Session Share", "ATC Session Share", "Purchase Session Share"', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			//click on billboard menu button
			await (await perfPage.clickBillBoardMenus(1)).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.checkMenuButtonLabels();
		});

		test('028: verify when any metrics is selected from billboard which is already selected in any filter then their values will be swapped', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			//click on billboard menu button
			await (await perfPage.clickBillBoardMenus(1)).click();
			await (
				await perfPage.clickBillBoardMenu(billboardMetrics7)
			).click();
			const metricsValue = await perfPage.getBillboardMetrics();
			await (await perfPage.clickBillBoardMenus(1)).click();
			await (
				await perfPage.clickBillBoardMenu(billboardMetrics2)
			).click();

			await (await perfPage.clickBillBoardMenus(2)).click();
			const metricsValueSecond =
				await perfPage.getSecondBillboardMetrics();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			expect(metricsValue.text).toContain(metricsValueSecond.text);
		});

		test('029: verify billboard data is coming correctly from api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.waitForAPIResponse(billboard);
			// perfPage.billboardWithAPI(
			// 	url,
			// 	lastWeekNumberInList,
			// 	minWaitTime,
			// 	billboardMetrics1,
			// 	1
			// );
		});
	}
);
