import homePageTest from '../homePage';
import centersPageTest from '../exploreCentersPage';
import signupPageTest from '../signupPage';
import signinPageTest from '../signinPage';
import authCentersPageTest from '../authCentersPage';
import addEventPageTest from '../addEventPage';
import addCenterPageTest from '../addCenterPage';
import eventsPageTest from '../events';
import profilePageTest from '../profilePage';
import addAdminPageTest from '../addAdminPage';
import transactionsPageTest from '../transactionsPage';

export default {
  ...homePageTest,
  ...centersPageTest,
  ...signupPageTest,
  ...signinPageTest,
  ...authCentersPageTest,
  ...addEventPageTest,
  ...addCenterPageTest,
  ...eventsPageTest,
  ...profilePageTest,
  ...addAdminPageTest,
  ...transactionsPageTest,
  'End the test': (browser) => {
    browser.end();
  }
};
