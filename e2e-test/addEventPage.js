import baseUrl from './constants';

export default {
  'Add event page should display correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/centers`)
      .waitForElementVisible('body', 1000)
      .click('.centerCard a.btn[href="/addEvent"]')
      .pause(200)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Create Event')
      .assert.visible('input[id="title"]')
      .assert.visible('textarea[id="description"]')
      .assert.visible('div.calendar-container')
      .assert.containsText('.action-btns .btn.ie-blue-button', 'Create Event')
      .assert.containsText('.action-btns a[href="/centers"]', 'Choose another center')
      .pause(500);
  },
  'Show error when user tries to add event without title': (browser) => {
    browser
      .setValue('input[id="title"]', '')
      .setValue('textarea[id="description"]', 'An event without title')
      .assert.elementNotPresent('.text-danger.small')
      .click('.action-btns .btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
};
