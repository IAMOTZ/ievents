/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Profile from '../../container/Profile';

const props = {
  user: { name: 'test-user' },
  events: [
    { id: 1, status: 'done' },
    { id: 2, status: 'allowed' },
    { id: 2, status: 'canceled' },
    { id: 2, status: 'done' },
  ],
  authenticated: true,
  isAdmin: false,
  isSuperAdmin: false,
  status: {
    changingPassword: false,
    changingPasswordResolved: false,
    changingPasswordRejected: false,
  },
  dispatch: () => { },
};

const alterProps = newProps => ({
  user: props.user,
  events: props.events,
  authenticated: newProps.authenticated === undefined ? true : newProps.authenticated,
  isAdmin: newProps.isAdmin || false,
  isSuperAdmin: newProps.isSuperAdmin || false,
  status: {
    changingPassword: newProps.changingPassword || false,
    changingPasswordResolved: newProps.changingPasswordResolved || false,
    changingPasswordRejected: newProps.changingPasswordRejected || false,
  },
  dispatch: () => { },
});

describe('<Profile />', () => {
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Profile {...props} />);
    });
    it('should redirect to login page if user is not authenticated', () => {
      wrapper.setProps(alterProps({ authenticated: false }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when changing password', () => {
      wrapper.setProps(alterProps({ changingPassword: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is a changing password error', () => {
      wrapper.setProps(alterProps({ changingPasswordRejected: { message: 'there was an error' } }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    describe('Changing Password', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<Profile {...props} />);
      });
      it('should update the state when the user keys in the former password', () => {
        const formerPassword = 'FormerPassword12';
        wrapper
          .find('input#former-password')
          .simulate('change', { target: { name: 'formerPassword', value: formerPassword } });
        expect(wrapper.state('formerPassword')).toEqual(formerPassword);
      });
      it('should update the state when the user keys in the new password', () => {
        const newPassword = 'NewPassword12';
        wrapper
          .find('input#new-password')
          .simulate('change', { target: { name: 'newPassword', value: newPassword } });
        expect(wrapper.state('newPassword')).toEqual(newPassword);
      });
      it('should update teh state when the user keys in confirm new password field', () => {
        const confirmNewPassword = 'NewPassword12';
        wrapper
          .find('input#confirm-new-password')
          .simulate('change', { target: { name: 'confirmNewPassword', value: confirmNewPassword } });
        expect(wrapper.state('confirmNewPassword')).toEqual(confirmNewPassword);
      });
      it('should clear all the inputs when the user closes the modal', () => {
        wrapper
          .find('input#former-password')
          .simulate('change', { target: { name: 'formerPassword', value: 'FormerPassword12' } });
        wrapper
          .find('#change-password-modal button[data-dismiss="modal"].close')
          .simulate('click');
        expect(wrapper.find('input#former-password').props().value).toEqual('');
      });
    });
  });
});
