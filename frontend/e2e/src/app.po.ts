import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  navigateToLoginPage() {
    return browser.get('/login');
  }

  getUsernameInput() {
    return element(by.id('username'));
  }

  getPasswordInput() {
    return element(by.id('password'));
  }

  getSubmitButton() {
    return element(by.className('btn btn-success form-button'));
  }

}
