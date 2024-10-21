import test, { expect } from '@playwright/test';
import performancePage from './pages/performancePage';
import {
	billboardMetrics1,
	billboardMetrics2,
	billboardMetrics7,
	categoryNum1,
	categoryNum2,
	customFromDateFilter,
	dashboardData,
	donutValuesInternalApp,
	donutValuesInternalNonSearch,
	donutValuesInternalWebNonSearch,
	donutValuesWeb,
	donutValuesWebInternalWebSearch,
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
import {
	aria,
	billboard,
	categoryHirarchy,
	donutChart,
	sessionShare
} from '../shared/apiEndpoints';
import SessionSharePage from './pages/sessionSharePage';

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
			).not.toBeVisible();
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
				await perfPage.selectPlatformsSelected('')
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
			).not.toBeVisible();
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
			await perfPage.billboardWithAPI(
				lastWeekNumberInList,
				billboardMetrics1,
				1
			);
		});
	}
);

test.describe(
	'Performance: Test Session convertion chart visible and all required metrics are present',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('030: verify session Conversion chart is present and required metrics to be present', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			// check visibility of session conversion chart has all 3 metrics of conversion
			await expect(await perfPage.sessionConversionChart()).toBeVisible();
			await perfPage.sessionConversionChartMetrics2And3();
		});
	}
);

test.describe(
	'Performance: Test Session of convertion chart and see details link',
	{ tag: ['@Regression'] },
	() => {
		test('031: verify session Conversion chart has session pdp view rate , session a2c rate and purchase rate matching with billboard', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			// verify for a metrics say "Session pdp view rate" matching with billboard values
			await perfPage.verifySessionConvChartMetricsForCategory(
				lastWeekNumberInList,
				billboardMetrics1,
				'3',
				'1'
			);
		});

		test('032: verify see details link in session conversion chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(await perfPage.seeDetailsLink()).toContainText(
				'See Details'
			);
		});

		test('033: verify clicking on details link takes to session conversion details page ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(categoryHirarchy);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			//click on see details link
			await (await perfPage.seeDetailsLink()).click();
			await expect(
				await perfPage.sessionCoPage.SessionOfConversionPage()
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test SOT Donut chart visibility ',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('034: verify the Donut Chart is seen', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(await perfPage.donutChartPresence()).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test SOT Donut Scenerios and see details link',
	{ tag: ['@Regression'] },
	() => {
		test('035: verify the Donut Chart have EXTERNAL WEB,Mobile APP - NON-SEARCH,Walmart.com - SEARCH,Walmart.com - NON-SEARCH,Mobile App - SEARCH when web & app both are selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
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

		test('036: verify the Donut Chart have see details button', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(await perfPage.donutChartPresence()).toBeVisible();
			await expect(await perfPage.seeDetailsLinkSOTChart()).toBeVisible();
		});

		test('037: verify the Donut Chart see details button will be clickable and user will be redirected to sot details page', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(await perfPage.seeDetailsLinkSOTChart()).toBeVisible();
			await (await perfPage.seeDetailsLinkSOTChart()).click();
			await expect(await perfPage.sotDetails()).toBeVisible();
		});

		test('038: verify the Donut Chart have EXTERNAL,Walmart.com - SEARCH,Walmart.com - NON-SEARCH when web is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformApp)).click();
			await expect(
				await perfPage.checkDonutMetrics(donutValuesWeb)
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

		test('039: verify the Donut Chart have Mobile APP - NON-SEARCH,Mobile App - SEARCH when app is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(donutChart);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.checkSelectedCategoryIsApplied(
				categoryNum1.toString()
			);
			await expect(await perfPage.selectPlatformDropdown()).toBeVisible();
			await (await perfPage.selectPlatformDropdown()).click();
			await (await perfPage.clickAppWeb(PlaformApp)).click();
			await expect(
				await perfPage.checkDonutMetrics(donutValuesInternalNonSearch)
			).toBeVisible();
			await expect(
				await perfPage.checkDonutMetrics(donutValuesInternalApp)
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test visibility of Session share in performance home page',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('040: verify that user would see session share Chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				await perfPage.sessionshareChartPresence()
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test Session share in performance home page',
	{ tag: ['@Regression'] },
	() => {
		test('041: verify that user would see session share Chart details page link visibility', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				await perfPage.sessionshareChartPresence()
			).toBeVisible();
			await expect(
				await perfPage.seeDetailsLinkSessionShareChart()
			).toBeVisible();
		});
		test('042: verify that user would be redirected to session share page after clicking on see session share Chart details page link ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				await perfPage.sessionshareChartPresence()
			).toBeVisible();
			await expect(
				await perfPage.seeDetailsLinkSessionShareChart()
			).toBeVisible();
		});

		test('043: verify that user can see pdp view session share by default and user can select Product page view,add to cart or purchase any from dropdown and corresponding legends will be displayed below chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await (await perfPage.sessionshareChartPresence()).click();
			await expect(
				await perfPage.sessionShareDropdown('PDP views')
			).toBeVisible();
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'PDP views'
				)
			).toBeVisible();

			// check pdp view visible in legend
			await (await perfPage.sessionShareDropdown('PDP views')).click();
			await (await perfPage.selectMenu('Add to cart')).click();
			// check add to cart visible in legend
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'Add to cart'
				)
			).toBeVisible();
			await (await perfPage.sessionShareDropdown('Add to cart')).click();
			await (await perfPage.selectMenu('Purchase')).click();
			await expect(
				await perfPage.sessionShPage.checkLegendsBelowBarChart(
					'Purchase'
				)
			).toBeVisible();
		});

		test('044: verify that the sessionshareValuePdp or atc or purchase is matching with the api response', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			const sessionShPage = new SessionSharePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(sessionShare);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			const metricsValue = await sessionShPage.checkTooltipsWithApi(
				lastWeekNumberInList
			);
			expect(metricsValue.tooltipText).toContain(
				metricsValue.pdpSessionShareValue
			);
		});
	}
);

test.describe(
	'Performance: Test DOW visibility in performance home page',
	{ tag: ['@smoke', '@Regression'] },
	() => {
		test('045: verify that user would see DOW Chart visibility', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);

			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				await perfPage.verifyvisibilityDayOfTheWeekChart()
			).toBeVisible();
		});
	}
);

test.describe(
	'Performance: Test DOW Scenerios in performance home page',
	{ tag: ['@Regression'] },
	() => {
		test('046: verify that user would see day traffic filters', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);

			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				await perfPage.verifyvisibilityOfHODorDOWFilter('Daily Traffic')
			).toBeVisible();

			//perfPage.verifyvisibilityOfHODorDOWFilter("Hour of the day", { timeout: minWaitTime }).should('be.visible')
		});

		test('047: verify that user would be able to see date range in filter for Day Traffic chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			const date = await perfPage.getDateFeomCalender(
				lastWeekNumberInList
			);
			let filterDOWDate = date.getText;
			await perfPage.dateFilterApplyBtnClick();
			await (await perfPage.verifyDeptAndCatFilter()).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await (await perfPage.checkUncheckADepartment(1)).click();
			await page.locator('button', { hasText: 'Confirm' }).click();
			await (
				await perfPage.verifyvisibilityOfHODorDOWFilter('Daily Traffic')
			).click();
			//check date range visible
			await expect(
				await perfPage.checkDateRangeFilterFrmDOWChart(filterDOWDate)
			).toBeVisible();
		});

		test('048: verify by default product page view is selected in Day traffic chart and verify legend below day traffic chart should be product page view if product page view is selected and so on based on filter selection', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await expect(
				await perfPage.pageAtcPurchaseSelectionFiltr('PDP views')
			).toBeVisible();
			await expect(
				await perfPage.legendsBelowDOWHODChart('PDP views')
			).toBeVisible();
			await (
				await perfPage.pageAtcPurchaseSelectionFiltr('PDP views')
			).click();
			await (await perfPage.selectMenu('Purchase')).click();
			await expect(
				await perfPage.legendsBelowDOWHODChart('Purchase')
			).toBeVisible();
		});

		test('049: verify menu in dow chart has product page view, add to cart and purchase', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.dateFilterIcon().click();
			await perfPage.clickWeekNumbersList(lastWeekNumberInList).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await perfPage.dateFilterApplyBtnClick();
			await (
				await perfPage.pageAtcPurchaseSelectionFiltr('PDP views')
			).click();
			//check menu items
			await expect(await perfPage.selectMenu('PDP views')).toBeVisible();
			await expect(
				await perfPage.selectMenu('Add to cart')
			).toBeVisible();
			await expect(await perfPage.selectMenu('Purchase')).toBeVisible();
			//select Product page view
			await expect(await perfPage.selectMenu('PDP views')).toBeVisible();
		});

		test('050: verify in day of week chart for a particular day the tooltip should match with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			const metricsValue = await perfPage.checkTooltipsWithApiDOW(
				lastWeekNumberInList,
				'dow'
			);
			expect(metricsValue.tooltipText).toContain(
				metricsValue.ValuePdpCount
			);
		});

		test('051: verify in day of week chart for a particular day the average value from tooltip should match with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			const metricsValue = await perfPage.checkAvgTooltipsWithApiDOW(
				lastWeekNumberInList,
				'dow'
			);
			expect(metricsValue.tooltipText).toContain(
				metricsValue.AvgValuePdpCount
			);
		});
		test('052: verify that user can  see Product page view, add to cart, purcahse and select any filter from day traffic chart', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await (await perfPage.clickDOWHODFilterMenus()).click();
			await perfPage.checkMenuButtonLabelsForHODAndDOW();
		});
		test('053: verify legends below  dow chart should be selected filter and Average of the selected date range', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(billboard);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await expect(
				perfPage.performanceElements.legendBelowHODDOWFilter(
					'PDP views'
				)
			).toBeVisible();
			await expect(
				perfPage.performanceElements.legendBelowHODDOWFilter(
					'Average of the selected date range'
				)
			).toBeVisible();
		});
	}
);

test.describe.skip(
	'Performance: Test HOD in performance home page',
	{ tag: ['@Regression', '@smoke'] },
	() => {
		test('054: verify that user can click on hour of day link and would see HOD Chart visibility', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await perfPage.verifyvisibilityDayOfTheWeekChart();
			await (await perfPage.hodLink()).click();
		});
	}
);

test.describe(
	'Performance: Test HOD scenerios in performance home page',
	{ tag: ['@Regression'] },
	() => {
		test.skip('055: verify in hour of the day chart for a particular day the metrics value from tooltip should match with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);

			await (await perfPage.hodLink()).click();
			await expect(
				await perfPage.verifyvisibilityDayOfTheWeekChart()
			).toBeVisible();
			const metricsValue = await perfPage.checkTooltipsWithApiDOW(
				lastWeekNumberInList,
				'hod'
			);
			expect(metricsValue.tooltipText).toContain(
				metricsValue.ValuePdpCount
			);
		});
		test.skip('056: verify in hour of the day chart for a particular day the average metrics value from tooltip should match with api', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.waitForAPIResponse(aria);
			await perfPage.selectDateAndCategory(lastWeekNumberInList);
			await (await perfPage.hodLink()).click();
			await expect(
				await perfPage.verifyvisibilityDayOfTheWeekChart()
			).toBeVisible();

			const metricsValue = await perfPage.checkAvgTooltipsWithApiDOW(
				lastWeekNumberInList,
				'hod'
			);
			expect(metricsValue.tooltipText).toContain(
				metricsValue.AvgValuePdpCount
			);
		});
	}
);

test.describe(
	'Performance: for category Test Upc count is visible',
	{ tag: ['@Regression', '@smoke'] },
	() => {
		test('057: verify upc count visible', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			const textreceived = await perfPage.upcCount();
			const containsNumeric = /UPC count: \d+/.test(textreceived.text);
			expect(containsNumeric).toBeTruthy();
		});
	}
);

test.describe(
	'Performance: Test UPC Filter Scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('058: verify initially clear and cancel buttons are disabled', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.checkInitiallyUpcClearConfirmBtnDisabled();
		});

		test('059: verify user can paste upcs in upc textbox', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await expect(await perfPage.checkAndClickOnUpcBtn()).toBeVisible();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd)
				).toBeVisible();

				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc)
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs);
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			//check after confirming with correct upcs the upc box is now closed
			await expect(
				perfPage.performanceElements.upcPasteArea()
			).not.toBeVisible();
		});

		test('060: verify when upcs are pasted the category and department selection filter is disabled', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd)
				).toBeVisible();

				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc)
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs);
			}

			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await expect(await perfPage.categoryDisabledFilter()).toBeVisible();
		});

		test('061: verify when user enters wrong upcs then error message appears and user can do remove all error', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.performanceElements.upcPaste().fill('234321');
			await perfPage.performanceElements.upcPaste().press('{enter}');
			await (await perfPage.ConfirmBtnUpc()).click();
			await expect(
				await perfPage.verifyErrorMessgae('Values error')
			).toBeVisible();

			await expect(
				await perfPage.verifyErrorMessgae('Remove all errors')
			).toBeVisible();

			await (
				await perfPage.verifyErrorMessgae('Remove all errors')
			).click();
			await expect(
				perfPage.performanceElements.pastedUpc('234321')
			).not.toBeVisible();
		});

		test('062: verify clear button', async ({ page }) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.performanceElements.upcPaste().fill('234321');
			await (await perfPage.ClearBtnUpc()).click();
			await expect(
				await perfPage.upcTextField('234321')
			).not.toBeVisible();
		});

		test('063: verify cross button on upc filter when clicked it will remove upc filters and  category and department selection filter is enabled again', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await expect(await perfPage.checkAndClickOnUpcBtn()).toBeVisible();
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd)
				).toBeVisible();

				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc)
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs);
			}

			await (await perfPage.ConfirmBtnUpc()).click();
			await (await perfPage.checkAndClickOnUpcBtn())
				.locator('next-sibling=div')
				.click();
			await expect(
				await perfPage.categoryDisabledFilter()
			).not.toBeVisible();
		});

		test('064: verify confirm button is disabled initially and would be disabled when applied incorrect upc and after removing incorrect upc it should be enabled', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await expect(await perfPage.confirmButtonDisabled()).toBeVisible();
			await perfPage.pasteUpcs('234321');
			await (await perfPage.ConfirmBtnUpc()).click();
			page.waitForTimeout(DEFAULT_TIMEOUT);
			await (
				await perfPage.verifyErrorMessgae('Remove all errors')
			).click();
			await perfPage.pasteUpcs('234321');
			await expect(
				await perfPage.confirmButtonDisabled()
			).not.toBeVisible();
		});

		test('065: verify upc count visible after upcs insertion', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd)
				).toBeVisible();

				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc)
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs);
			}

			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			const textreceived = await perfPage.upcCount();
			const containsNumeric = /UPC count: \d+/.test(textreceived.text);
			expect(containsNumeric).toBeFalsy();
		});

		test('066: verify in case of multiple upcs when upcs are removed category filter should be enabled', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd)
				).toBeVisible();

				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd);
			} else {
				await perfPage.pasteUpcs(dashboardData.upc);
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc)
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs);
			}

			await (await perfPage.ConfirmBtnUpc()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			await (await perfPage.checkAndClickOnUpcBtn()).click();
			await perfPage.performanceElements.clearUpcLink().click();
			await perfPage.performanceElements.upcPaste().press('{esc}');
			await perfPage.checkCategoryFilterDisabled();
		});
	}
);
test.describe(
	'Performance: Test Export Filter Scenerios',
	{ tag: ['@Regression'] },
	() => {
		test('067: verify Export Filter is visible when category is selected', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await expect(await perfPage.datasetBtn()).toBeVisible();
			await (await perfPage.datasetBtn()).click();
			await expect(await perfPage.datasetMenus('Daily')).toBeVisible();
			await expect(await perfPage.datasetMenus('Weekly')).toBeVisible();
		});

		test('068: verify Export Filter is visible after upcs provided', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd); // aupcProd
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd) // aupcProd
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd); // upcsProd
			} else {
				await perfPage.pasteUpcs(dashboardData.upc); // aUpc
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc) // aUpc
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs); //Upcs
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await expect(await perfPage.datasetBtn()).toBeVisible();
			await (await perfPage.datasetBtn()).click();
		});

		test('069: for category: verify clicking on daily and weekly will download data  when clicked on download button ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			await (await perfPage.datasetBtn()).click();
			await page.waitForTimeout(DEFAULT_TIMEOUT);
			const textreceived = await perfPage.upcCount();
			const containsNumeric = /UPC count: \d+/.test(textreceived.text);
			let upc = textreceived.text;
			let upcVal = parseInt(upc.split(':')[1].trim());
			if (upcVal < 500) {
				expect(
					await perfPage.checkFileDownloaded(
						await perfPage.datasetMenus('Daily')
					)
				).toBeTruthy();

				expect(containsNumeric).toBeTruthy();
			} else {
				await (await perfPage.datasetMenus('Daily')).click();
				await expect(await perfPage.verifyMessage()).toBeVisible();

				expect(
					await perfPage.checkFileDownloaded(
						await perfPage.performanceElements.download()
					)
				).toBeTruthy();
			}
			await perfPage.deleteDownloadedFile();
		});

		test('070: for upc: verify user can select daily/weekly for daily data gets downloaded when clicked on daily/weekly from Dataset Filter ', async ({
			page
		}) => {
			const perfPage = new performancePage(page);
			await perfPage.navigateToDefaultCompany();
			await perfPage.selectLastWeekDtAndCategory(lastWeekNumberInList);
			if (process.env.ENV === 'PROD') {
				await perfPage.pasteUpcs(dashboardData.upcProd); // aupcProd
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upcProd) // aupcProd
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.otherUPCSProd); // upcsProd
			} else {
				await perfPage.pasteUpcs(dashboardData.upc); // aUpc
				await expect(
					await perfPage.pastedUpcCheck(dashboardData.upc) // aUpc
				).toBeVisible();
				await perfPage.pasteUpcTextArea(dashboardData.upcs); //Upcs
			}
			await (await perfPage.ConfirmBtnUpc()).click();
			await (await perfPage.datasetBtn()).click();
			await expect(await perfPage.datasetMenus('Daily')).toBeVisible();
			expect(
				await perfPage.checkFileDownloaded(
					await perfPage.datasetMenus('Daily')
				)
			).toBeTruthy();

			expect(
				await perfPage.checkFileDownloaded(await perfPage.datasetBtn())
			).toBeTruthy();
			expect(
				await perfPage.checkFileDownloaded(
					await perfPage.datasetMenus('Weekly')
				)
			).toBeTruthy();
			await perfPage.deleteDownloadedFile();
		});
	}
);
