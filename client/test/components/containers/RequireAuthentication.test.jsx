import React from 'react';
import RequireAuthentication from '../../../components/containers/RequireAuthentication';

describe('<RequireAuthentication />', () => {
  const props = {
    isUserAuthenticated: null,
  };
  const childComponent = <p>You need authentication to see me</p>;
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RequireAuthentication {...props}>{childComponent}</RequireAuthentication>);
    });
    it('should redirect to login page if user is not authenticated', () => {
      wrapper.setProps({ isUserAuthenticated: false });
      expect(wrapper).toMatchSnapshot();
    });
    it('should render the child componetn is the user is authenticated', () => {
      wrapper.setProps({ isUserAuthenticated: true });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
