import baseUrl from './constants';

export default {
  'Explore Centers page should display correctly': (browser) => {
    browser
      .url(`${baseUrl}/explore/centers`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.navbar-brand', 'iEvents')
      .assert.visible('.nav-link[href="/"]')
      .assert.visible('.nav-link[href="/explore/centers"]')
      .assert.visible('.nav-link[href="/users/login"]')
      .assert.visible('.nav-link[href="/users/signup"]')
      .assert.containsText('h1.caption-text', 'A special center for a special event')
      .verify.visible('.centerCard')
      .verify.visible('.centerCard a.btn[href="/addEvent"]')
      .verify.visible('.centerCard a[href="#center-details-modal"]')
      .click('.centerCard a[href="#center-details-modal"]', () => {
        browser
          .pause(200)
          .assert.visible('div#center-details-modal');
      })
      .pause(500);
  },
};
