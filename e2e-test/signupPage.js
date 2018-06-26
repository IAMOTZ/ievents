import baseUrl from './constants';

export default {
  'Signup page should display correctly': (browser) => {
    browser
      .url(`${baseUrl}/users/signup`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.navbar-brand', 'iEvents')
      .assert.visible('.nav-link[href="/"]')
      .assert.visible('.nav-link[href="/explore/centers"]')
      .assert.visible('.nav-link[href="/users/login"]')
      .assert.visible('.nav-link[href="/users/signup"]')
      .assert.containsText('h1.card-header', 'Sign up')
      .assert.visible('input[id="name"]')
      .assert.visible('input[id="email"]')
      .assert.visible('input[id="password"]')
      .assert.visible('input[id="password"]')
      .assert.visible('input[id="confirm-password"]')
      .assert.containsText('form .btn.ie-blue-button', 'Register')
      .assert.containsText('footer h1', 'iEvents')
      .pause(500);
  },
  'Show error when user tries to signup without name': (browser) => {
    browser
      .setValue('input[id="name"]', '')
      .setValue('input[id="email"]', 'tester@gmail.com')
      .setValue('input[id="password"]', 'Password123')
      .setValue('input[id="confirm-password"]', 'Password123')
      .assert.elementNotPresent('.text-danger.small')
      .click('.btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.form-group .text-danger');
      })
      .pause(500);
  },
  'Show error when user tries to signup without email': (browser) => {
    browser
      .refresh()
      .setValue('input[id="name"]', 'tester')
      .setValue('input[id="email"]', '')
      .setValue('input[id="password"]', 'Password123')
      .setValue('input[id="confirm-password"]', 'Password123')
      .assert.elementNotPresent('.text-danger.small')
      .click('.btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
  'Show error when user tries to signup without password': (browser) => {
    browser
      .refresh()
      .setValue('input[id="name"]', 'tester')
      .setValue('input[id="email"]', 'tester@gmail.com')
      .setValue('input[id="password"]', '')
      .setValue('input[id="confirm-password"]', 'Password123')
      .assert.elementNotPresent('.text-danger.small')
      .click('.btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
  'Show error when user tries to signup if password and confirm-password do not match': (browser) => {
    browser
      .refresh()
      .setValue('input[id="name"]', 'tester')
      .setValue('input[id="email"]', 'tester@gmail.com')
      .setValue('input[id="password"]', 'Password456')
      .setValue('input[id="confirm-password"]', 'Password123')
      .assert.elementNotPresent('.text-danger.small')
      .click('.btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
};
