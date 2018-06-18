import dotEnv from 'dotenv';

dotEnv.config();

const baseUrl = 'http://localhost:8080';
const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
const superAdminPass = process.env.SUPER_ADMIN_PASSWORD;

export default {
  'Login page should display correctly': (browser) => {
    browser
      .url(`${baseUrl}/users/login`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.navbar-brand', 'iEvents')
      .assert.visible('.nav-link[href="/"]')
      .assert.visible('.nav-link[href="/explore/centers"]')
      .assert.visible('.nav-link[href="/users/login"]')
      .assert.visible('.nav-link[href="/users/signup"]')
      .assert.containsText('h1.card-header', 'Log in')
      .assert.visible('input[id="email"]')
      .assert.visible('input[id="password"]')
      .assert.containsText('form .btn.ie-blue-button', 'Log in')
      .assert.containsText('footer h1', 'iEvents')
      .pause(500);
  },
  'Show error when user tries to login without email': (browser) => {
    browser
      .setValue('input[id="email"]', '')
      .setValue('input[id="password"]', 'Password123')
      .assert.elementNotPresent('.text-danger.small')
      .click('form .btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
  'Show error when user tries to login without password': (browser) => {
    browser
      .refresh()
      .setValue('input[id="email"]', 'tester@gamil.com')
      .setValue('input[id="password"]', '')
      .assert.elementNotPresent('.text-danger.small')
      .click('form .btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.visible('.text-danger.small');
      })
      .pause(500);
  },
  'Login successfully with the superAdmin credentials': (browser) => {
    browser
      .refresh()
      .setValue('input[id="email"]', superAdminEmail)
      .setValue('input[id="password"]', superAdminPass)
      .click('form .btn.ie-blue-button', () => {
        browser
          .pause(100)
          .assert.urlEquals(`${baseUrl}/centers`);
      })
      .pause(500);
  },
};
