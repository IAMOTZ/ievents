import baseUrl from './constants';

export default {
  'Add Admin page should display correctly': (browser) => {
    browser
      .url(`${baseUrl}/addAdmin`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('nav#header strong.navbar-brand', 'Add an admin')
      .assert.visible('input[id="input-email"]')
      .assert.visible('#add-btn.ie-blue-button', 'Add Admin')
      .pause(500);
  },
  'Show error when user tries to add admin without email': (browser) => {
    browser
      .setValue('input[id="input-email"]', '')
      .assert.elementNotPresent('.text-danger.small')
      .click('#add-btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
};
