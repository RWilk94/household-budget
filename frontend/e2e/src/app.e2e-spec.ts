import { AppPage } from './app.po';
import {browser, protractor} from "protractor";

describe('workspace-project App', () => {
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
});
