import baseUrl from './constants';

export default {
  'Home page should display correctly': (browser) => {
    browser
      .url(baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.navbar-brand', 'iEvents')
      .assert.containsText('h1.display-2.text-center', 'Welcome to iEvents')
      .assert.visible('.nav-link[href="/"]')
      .assert.visible('.nav-link[href="/explore/centers"]')
      .assert.visible('.nav-link[href="/users/login"]')
      .assert.visible('.nav-link[href="/users/signup"]')
      .assert.visible('a.btn[href="/explore/centers"]')
      .pause(500);
  }
};
