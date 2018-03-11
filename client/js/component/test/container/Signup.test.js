/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Signup from '../../container/Signup';

const props = {
  user: {},
  error: { message: null },
  status: {
    fetching: false,
    fetched: false,
  },
  dispatch: () => { },
};

const alterPorps = newProps => ({
  user: {},
  error: newProps.error || { message: null },
  status: {
    fetching: newProps.fetching || false,
    fetched: newProps.fetched || false,
  },
  dispatch: () => { },
});

describe('<Signup />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Signup {...props} />);
    })
    it('should render correctly on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect if user is already logged in', () => {
      wrapper.setProps(alterPorps({ fetched: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when registering a user', () => {
      wrapper.setProps(alterPorps({ fetching: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is an error', () => {
      wrapper.setProps(alterPorps({ error: 'there was an error' }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behavior:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Signup {...props} />);
    })
    it('should update the state as the user provides name input', () => {
      const name = 'test-user';
      wrapper
        .find('#name')
        .simulate('change', { target: { name: 'name', value: name } });
      expect(wrapper.state('name')).toEqual(name);
    });
    it('should update the state as the user provides email input', () => {
      const email = 'test@gmail.com';
      wrapper
        .find('#email')
        .simulate('change', { target: { name: 'email', value: email } });
      expect(wrapper.state('email')).toEqual(email);
    });
    it('should update the state as the user provides password input', () => {
      const password = 'Test-Password12';
      wrapper
        .find('#password')
        .simulate('change', { target: { name: 'password', value: password } });
      expect(wrapper.state('password')).toEqual(password);
    });
    it('should update the state as the user provides confirm password input', () => {
      const confirmPassword = 'Test-Password12';
      wrapper
        .find('#confirm-password')
        .simulate('change', { target: { name: 'confirmPassword', value: confirmPassword } });
      expect(wrapper.state('confirmPassword')).toEqual(confirmPassword);
    });
  });
});
