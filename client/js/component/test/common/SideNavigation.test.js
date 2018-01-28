import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SideNavigation from '../../common/SideNavigation.jsx';

const props = {
  name: 'test-name',
  isAdmin: false,
  isSuperAdmin: false,
  dispatch: () => { },
};
const alterProps = newProps => ({
  name: props.name,
  isAdmin: Boolean(newProps.isAdmin),
  isSuperAdmin: Boolean(newProps.isSuperAdmin),
  dispatch: props.dispatch,
});

describe('<SideNavigation />', () => {
  it('should render correctly for normal user', () => {
    const tree = renderer.create(
      <Router>
        <SideNavigation {...props} />
      </Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly for admin user', () => {
    const tree = renderer.create(
      <Router>
        <SideNavigation {...alterProps({ isAdmin: true }) } />
      </Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly for super admin user', () => {
    const tree = renderer.create(
      <Router>
        <SideNavigation {...alterProps({ isSuperAdmin: true }) } />
      </Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
