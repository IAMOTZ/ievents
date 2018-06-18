import baseUrl from './constants';

export default {
  'Profile page should show correctly after authentication': (browser) => {
    browser
      .url(`${baseUrl}/profile`)
      .waitForElementVisible('body', 1000)
      .assert.visible('#side-navigation a.list-group-item[href="/events"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addCenter"]')
      .assert.visible('#side-navigation a.list-group-item[href="/addAdmin"]')
      .assert.visible('#side-navigation a.list-group-item[href="/centers/transactions"]')
      .assert.visible('#side-navigation a.list-group-item[href="/profile"]')
      .assert.visible('#side-navigation a.list-group-item[href="/"]')
      .assert.containsText('#header strong.navbar-brand', 'Profile')
      .verify.visible('#profile-details')
      .verify.visible('.account-settings a[href="#change-password-modal"]')
      .verify.visible('.account-settings a[href="#delete-account-modal"]')
      .pause(500);
  },
  'Show error when user tries to change password without former password': (browser) => {
    browser
      .click('.account-settings a[href="#change-password-modal"]', () => {
        browser
          .pause(500)
          .assert.visible('div#change-password-modal')
          .setValue('input[id="former-password"]', '')
          .setValue('input[id="new-password"]', 'NewPassword123')
          .setValue('input[id="confirm-new-password"]', 'NewPassword123')
          .assert.elementNotPresent('.text-danger.small')
          .click('div#change-password-modal .btn.ie-blue-button')
          .assert.visible('.text-danger.small')
          .click('div#change-password-modal button[data-dismiss="modal"]');
      })
      .pause(500);
  },
  'Show error when user tries to delete account without former password': (browser) => {
    browser
      .click('.account-settings a[href="#delete-account-modal"]', () => {
        browser
          .pause(500)
          .assert.visible('div#delete-account-modal')
          .setValue('input[id="password"]', '')
          .assert.elementNotPresent('.text-danger.small')
          .click('div#delete-account-modal .btn.btn-danger')
          .assert.visible('.text-danger.small')
          .click('div#delete-account-modal button[data-dismiss="modal"]');
      })
      .pause(500);
  }
};
