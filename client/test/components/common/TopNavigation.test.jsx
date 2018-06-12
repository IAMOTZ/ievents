import React from 'react';
import { RegularTopNavigation, AuthTopNavigation } from '../../../components/common/TopNavigation';
import AdminLinks from '../../../components/common/TopNavigation/AdminLinks';

const props = {
  name: 'Tester',
  title: 'Testing',
  isAdmin: false,
  isSuperAdmin: false,
  dispatch: jest.fn(),
};

const alterProps = newProps => ({ ...props, ...newProps });

describe('<RegularTopNavigation />', () => {
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<RegularTopNavigation />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});


describe('<AuthTopNavigation />', () => {
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<AuthTopNavigation {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Interaction', () => {
    it('should dispatch the logout action', () => {
      const wrapper = shallow(<AuthTopNavigation {...props} />);
      wrapper.find('Link[to="/"]').simulate('click');
      expect(props.dispatch.mock.calls.length).toEqual(1);
    });
  });
});

describe('<AdminLinks />', () => {
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AdminLinks {...props} />);
    });
    it('should render correctly if the user is not an admin', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly if the user is an admin', () => {
      wrapper.setProps(alterProps({ isAdmin: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly if the user is a super admin', () => {
      wrapper.setProps(alterProps({ isSuperAdmin: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
