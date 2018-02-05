/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import TopNavigation, { UserTopNav } from '../../common/TopNavigation.jsx';

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

describe('<TopNavigation />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<TopNavigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('<UserTopNav />', () => {
  it('should render correctly for normal user', () => {
    const wrapper = shallow(<UserTopNav {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly for admin user', () => {
    const wrapper = shallow(<UserTopNav {...alterProps({ isAdmin: true }) } />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly for super admin user', () => {
    const wrapper = shallow(<UserTopNav {...alterProps({ isSuperAdmin: true }) } />);
    expect(wrapper).toMatchSnapshot();
  });
});
