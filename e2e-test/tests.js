import dotEnv from 'dotenv';

dotEnv.config();

const baseUrl = 'http://localhost:3000';
const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
const superAdminPass = process.env.SUPER_ADMIN_PASSWORD;

export default {
  // After I finish testing, I may want to remove all the pause that only
  // makes sure that I can see the testing as it is performed
  // I also need to set up a test database, so that I can actually test for:
  // - user can sign up
  // - user can add event =>
  // - user can see all his event
  // - user can edite an event
  // - user can delete an event
  // - user sees animation when he clicks refresh button
  // - user can cancel a transaction

  'User can visit the login page': (browser) => {
    browser
      .url(baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.containsText('a.navbar-brand strong', 'Ievents')
      .assert.containsText('#main-content h1', 'Welcome to Ievents')
      .assert.visible('#main-content a[href="/centers1"]')
      .assert.visible('#main-content .search-box input[type="text"]')
      .pause(500);
  },

  'User can use the links on the login page': (browser) => {
    browser
      .click('.navbar-nav a[href="/centers1"]')
      .assert.urlEquals(`${baseUrl}/centers1`)
      .back()
      .click('.navbar-nav a[href="/users/login"]')
      .assert.urlEquals(`${baseUrl}/users/login`)
      .back()
      .click('.navbar-nav a[href="/users"]')
      .assert.urlEquals(`${baseUrl}/users`)
      .back()
      .click('#main-content a[href="/centers1"]')
      .assert.urlEquals(`${baseUrl}/centers1`)
      .pause(500);
  },

  'User can visit the centers page': (browser) => {
    browser
      .url(`${baseUrl}/centers1`)
      .assert.containsText('a.navbar-brand strong', 'Ievents')
      .assert.containsText('#center-section-header h1', 'A special center for a special event')
      .assert.visible('input[placeholder="Search for a center"]')
      .verify.visible('.card') // This would pass only if there are centers in the app
      .pause(500);
  },

  'User can visit the signup page': (browser) => {
    browser
      .url(`${baseUrl}/users`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('a.navbar-brand strong', 'Ievents')
      .assert.containsText('.card .card-header', 'Sign up')
      .assert.visible('input[id="name"]')
      .assert.visible('input[id="email"]')
      .assert.visible('input[id="password"]')
      .assert.visible('input[id="confirm-password"]')
      .assert.containsText('form a.btn', 'Register')
      .pause(500);
  },

  // Verify that an error shows when the input is not complete
  'User can signup with the signup form': (browser) => {
    browser
      .setValue('input[id="name"]', 'test')
      .setValue('input[id="email"]', 'test@gmail.com')
      .setValue('input[id="password"]', 'Test@123')
      .setValue('input[id="confirm-password"]', '')
      .click('form a.btn', () => {
        browser
          .pause(5000)
          .assert.visible('div.bg-danger span');
      })
      .pause(500);
  },

  'User can visit the signin page': (browser) => {
    browser
      .url(`${baseUrl}/users/login`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('a.navbar-brand strong', 'Ievents')
      .assert.containsText('.card .card-header', 'Sign in')
      .assert.visible('input[id="email"]')
      .assert.visible('input[id="password"]')
      .assert.containsText('form button.btn', 'Log in')
      .pause(500);
  },

  'User can signin with the signin form': (browser) => {
    browser
      .setValue('input[id="email"]', superAdminEmail)
      .setValue('input[id="password"]', superAdminPass)
      .click('form button.btn', () => {
        browser
          .pause(5000)
          .assert.urlEquals(`${baseUrl}/addEvent`);
      })
      .pause(500);
  },

  'User can use the links on user specific pages': (browser) => {
    browser
      .click('a[href="/events"]')
      .assert.urlEquals(`${baseUrl}/events`)
      .back()
      .click('a[href="/addEvent"]')
      .assert.urlEquals(`${baseUrl}/addEvent`)
      .back()
      .click('a[href="/centers2"]')
      .assert.urlEquals(`${baseUrl}/centers2`)
      .back()
      .click('a[href="/addCenter"]')
      .assert.urlEquals(`${baseUrl}/addCenter`)
      .back()
      .click('a[href="/addAdmin"]')
      .assert.urlEquals(`${baseUrl}/addAdmin`)
      .back()
      .click('a[href="/transactions"]')
      .assert.urlEquals(`${baseUrl}/transactions`)
      .back()
      .pause(500);
  },

  // Verify theat an error message would show when the input is not complete
  'User can add an event': (browser) => {
    browser
      .setValue('input#title', 'test event')
      .setValue('textarea#description', 'Its just a test event')
      .setValue('input#date', '')
      .setValue('select#centers', '')
      .click('button.btn', () => {
        browser
          .pause(5000)
          .assert.visible('div.bg-danger span');
      })
      .pause(500);
  },

  // verify that an error message would show when the name is not given
  'User can add a center': (browser) => {
    browser
      .url(`${baseUrl}/addCenter`)
      .waitForElementVisible('body', 1000)
      .setValue('input#name', '')
      .setValue('input#location', 'test location')
      .setValue('textarea#details', 'test details')
      .setValue('input#capacity', 500)
      .setValue('input#price', 1000)
      .click('button#add-btn', () => {
        browser
          .pause(5000)
          .assert.visible('div.bg-danger span');
      })
      .pause(500);
  },

  // I am actually not editing a center, I just only tested that if I leave all the fields empty
  // I should be redrected to the centers page without any issues.
  'User can edit a center': (browser) => {
    browser
      .url(`${baseUrl}/centers2`)
      .waitForElementVisible('body', 1000)
      .assert.visible('a.btn[href="/editCenter"]')
      .click('a.btn[href="/editCenter"]', () => {
        browser
          .assert.urlEquals(`${baseUrl}/editCenter`)
          .setValue('input#name', '')
          .setValue('input#location', '')
          .setValue('textarea#details', '')
          .click('button.btn-outline-dark', () => {
            browser
              .pause(5000)
              .assert.urlEquals(`${baseUrl}/centers2`);
          })
          .pause(500);
      });
  },

  'User can add an admin': (browser) => {
    browser
      .url(`${baseUrl}/addAdmin`)
      .waitForElementVisible('body', 1000)
      .setValue('input#input-email', 'ogunniyitunmise@gmail.com')
      .click('button#add-btn', () => {
        browser
          .pause(5000)
          .assert.containsText('p.text-success', 'Admin Added!');
      })
      .pause(500);
  },

  'User can log out': (browser) => {
    browser
      .click('a[href="/"]', () => {
        browser
          .pause(100)
          .assert.urlEquals(`${baseUrl}/`);
      });
  },

  'Finish up test': (browser) => {
    browser.end();
  },
};
