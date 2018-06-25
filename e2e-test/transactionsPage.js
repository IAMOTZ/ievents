import baseUrl from './constants';

export default {
  'Transaction page should show correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/centers/transactions`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Transactions')
      .verify.visible('.centerCard')
      .verify.containsText('.centerCard .btn.ie-blue-button', 'View Transactions')
      .pause(500);
  },
  'Transaction-events page should show correctly': (browser) => {
    browser
      .click('.centerCard .btn.ie-blue-button')
      .pause(500)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Transaction/Events')
      .verify.visible('.event-card')
      .pause(500);
  }
};

