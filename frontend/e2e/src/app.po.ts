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

  getWelcomeText() {
    return element(by.id('welcome-text'));
  }

  navigateToCalendarPage() {
    return browser.get('/dashboard/calendar');
  }

  getFirstDayFromCalendar() {
    return element.all(by.className('cal-cell-top ng-star-inserted')).first();
  }

  getAddEventFromDropdown() {
    return element(by.tagName('ul'));
  }

  getInputName() {
    return element(by.id('name'));
  }

  getModuleDropdown() {
    return element.all(by.className('ng-select-container')).first();
  }

  getModuleFirstPosition() {
    return element.all(by.className('ng-option ng-star-inserted ng-option-marked')).first();
  }

  getCategoryDropdown() {
    return element.all(by.className('ng-select-container')).get(1);
  }

  getCategoryFirstPosition() {
    return element.all(by.className('ng-option ng-star-inserted ng-option-marked')).first();
  }

  getCalendarButton() {
    return element(by.className('btn btn-outline-secondary calendar'));
  }

  getCalendarFirstDay() {
    return element(by.className('ngb-dp-day ng-star-inserted'));
  }

  getInputValue() {
    return element(by.id('value'));
  }

  getSaveButton() {
    return element(by.className('btn btn-success form-button'));
  }

  getAlert() {
    return element(by.tagName('ngb-alert'));
  }

  getCancelButton() {
    return element(by.className('btn btn-secondary form-button'));
  }

  getItemsByFirstMonday() {
    return element.all(by.className('cal-cell-top ng-star-inserted')).get(1).element(by.className('cal-day-badge ng-star-inserted'));
  }

  navigateToSpendingPage() {
    return browser.get('/dashboard/spending');
  }

  getEditIcon() {
    return element.all(by.className('mat-icon material-icons ng-star-inserted')).first();
  }

  getMaterialInputName() {
    return element(by.id('input-name'));
  }

  getMaterialSaveIcon() {
    return element(by.id('mat-icon-save'));
  }

  getSpendName() {
    return element.all(by.id('column-name')).first();
  }

  getMaterialDeleteIcon() {
    return element.all(by.id('mat-icon-delete')).first();
  }

  getDialogConfirmButton() {
    return element(by.className('btn btn-danger'));
  }
}
