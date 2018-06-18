import baseUrl from './constants';

export default {
  'Centers page should display correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/centers`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Centers')
      .verify.visible('.centerCard')
      .verify.visible('.centerCard a.btn[href="/addEvent"]')
      .verify.visible('.centerCard a[href="#center-details-modal"]')
      .click('.centerCard a[href="#center-details-modal"]', () => {
        browser
          .pause(100)
          .assert.visible('div#center-details-modal')
          .click('div#center-details-modal button[data-dismiss="modal"]');
      })
      .pause(500);
  }
};
