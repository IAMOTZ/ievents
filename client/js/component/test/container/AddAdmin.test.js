/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AddAdmin from '../../container/AddAdmin.jsx';

const props = {
  user: { name: 'test-user' },
  authenticated: true,
  status: {
    adding: false,
    success: false,
    error: false,
  },
  dispatch: () => { },
};
const alterProps = newProps => ({
  user: newProps.user || props.user,
  authenticated: newProps.authenticated === undefined ? true : newProps.authenticated,
  status: {
    adding: newProps.adding || false,
    success: newProps.success || false,
    error: newProps.error || false,
  },
  dispatch: () => { },
});

describe('<AddAdmin />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddAdmin {...props} />);
    });
    it('should redirect to login page if user is not authenticated', () => {
      wrapper.setProps(alterProps({ authenticated: false }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when adding', () => {
      wrapper.setProps(alterProps({ adding: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddAdmin {...props} />);
    });
    it('should update the email state as the user inputs email', () => {
      let email = 'test@';
      wrapper
        .find('#input-email')
        .simulate('change', { target: { name: 'email', value: email } });
      expect(wrapper.state('email')).toEqual(email);
      email = 'test@gmail.com';
      wrapper
        .find('#input-email')
        .simulate('change', { target: { name: 'email', value: email } });
      expect(wrapper.state('email')).toEqual(email);
    });
    it('should update inputError state when user tries to add without email', () => {
      wrapper.find('#add-btn').simulate('click');
      expect(wrapper.state('inputError')).toEqual('Email is required');
    });
    it('should clear inputError state when user tries to add with email', () => {
      wrapper.setState({ inputError: 'Just any error' });
      wrapper
        .find('#input-email')
        .simulate('change', { target: { name: 'email', value: 'test@gmail.com' } });
      wrapper.find('#add-btn').simulate('click');
      expect(wrapper.state('inputError')).toBeNull();
    });
  });
});
