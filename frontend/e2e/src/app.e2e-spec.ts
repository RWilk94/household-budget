import { AppPage } from './app.po';
import {browser, protractor} from 'protractor';

describe('Household Budget Application', () => {
  let page: AppPage;
  browser.driver.manage().window().maximize();

  beforeEach(() => {
    page = new AppPage();
  });

  it('should redirect to /dashboard page after login to application', () => {
    page.navigateToLoginPage();
    page.getUsernameInput().sendKeys('user');
    page.getPasswordInput().sendKeys('password');
    page.getSubmitButton().click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:41951/dashboard'), 5000);
  });

  it('should display username on toolbar after login to application', () => {
    expect(page.getWelcomeText().getText()).toEqual('Witaj user');
  });

  it('should add event from calendar', () => {
    page.navigateToCalendarPage();
    browser.actions().mouseMove(page.getFirstDayFromCalendar()).perform();
    browser.actions().click(protractor.Button.RIGHT).perform();
    page.getAddEventFromDropdown().click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:41951/dashboard/add-spend'), 5000);
  });

  it('should insert spend event', () => {
    page.getInputName().sendKeys('E2E Test');
    page.getModuleDropdown().click();
    page.getModuleFirstPosition().click();
    page.getCategoryDropdown().click();
    page.getCategoryFirstPosition().click();
    page.getCalendarButton().click();
    page.getCalendarFirstDay().click();
    page.getInputValue().sendKeys('100');
    page.getSaveButton().click();

    expect(page.getAlert().isPresent()).toEqual(true);
    page.getCancelButton().click();
  });

  it('should edit spend', () => {
    page.navigateToSpendingPage();
    page.getSpendName().getText().then(text => {
      page.getEditIcon().click();
      page.getMaterialInputName().sendKeys('E2E');
      page.getMaterialSaveIcon().click();
      expect(page.getSpendName().getText()).toEqual(text + 'E2E');
    });
  });

  it('should delete spend', () => {
    page.navigateToSpendingPage();
    page.getMaterialDeleteIcon().click();
    page.getDialogConfirmButton().click().then(() => {
      browser.sleep(5000);
    });
  });

  it('should display home page after logout', () => {
    page.navigateToDashboardPage();
    page.getSignOutButton().click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:41951/'), 5000);
  });

});
