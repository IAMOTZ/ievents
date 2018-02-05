import React from 'react';
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
    const wrapper = shallow(<SideNavigation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly for admin user', () => {
    const wrapper = shallow(<SideNavigation {...alterProps({ isAdmin: true }) } />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly for super admin user', () => {
    const wrapper = shallow(<SideNavigation {...alterProps({ isSuperAdmin: true }) } />);
    expect(wrapper).toMatchSnapshot();
  });
});
