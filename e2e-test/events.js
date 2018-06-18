import baseUrl from './constants';

export default {
  'Events page should show correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/events`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Events')
      .verify.visible('.event-card')
      .verify.visible('.event-card a[href="#confirmation-modal"]')
      .verify.visible('.event-card a[href="#event-details-modal"]')
      .click('.event-card a[href="#event-details-modal"]', () => {
        browser
          .pause(100)
          .assert.visible('div#event-details-modal')
          .click('div#event-details-modal button[data-dismiss="modal"]');
      })
      .pause(500);
  },
};
