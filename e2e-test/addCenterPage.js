import baseUrl from './constants';

export default {
  'Add center page should display correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/addCenter`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Add a center')
      .assert.visible('input[id="name"]')
      .assert.visible('input[id="location"]')
      .assert.visible('input[id="capacity"]')
      .assert.visible('input[id="price"]')
      .assert.visible('textarea[id="details"]')
      .assert.visible('.image-input')
      .assert.containsText('button#add-btn', 'Add Center')
      .pause(500);
  },
  'Show error when user tries to add center without price': (browser) => {
    browser
      .assert.elementNotPresent('.text-danger.small')
      .setValue('input[id="price"]', '')
      .setValue('textarea[id="details"]', 'A center without price')
      .click('button#add-btn', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
};
