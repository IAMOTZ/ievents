/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Signin from '../../container/Signin.jsx';

const props = {
  user: {},
  error: null,
  status: {
    fetching: false,
    fetched: false,
  },
  dispatch: () => { },
};

const alterPorps = newProps => ({
  user: {},
  error: newProps.error || null,
  status: {
    fetching: newProps.fetching || false,
    fetched: newProps.fetched || false,
  },
  dispatch: () => { },
});

describe('<Signin />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Signin {...props} />);
    })
    it('should render correctly on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect if user is already logged in', () => {
      const newProps = alterPorps({ fetched: true });
      wrapper.setProps(newProps);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when logging in a user', () => {
      const newProps = alterPorps({ fetching: true });
      wrapper.setProps(newProps);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is an error', () => {
      const newProps = alterPorps({ error: 'there was an error' });
      wrapper.setProps(newProps);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Signin {...props} />);
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
  });
});
