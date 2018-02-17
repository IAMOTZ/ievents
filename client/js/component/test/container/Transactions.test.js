/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Transactions from '../../container/Transactions.jsx';

const props = {
  user: { name: 'test-user' },
  transactions: {
    centers: [
      { id: 1, name: 'test-center1' },
      { id: 2, name: 'test-center2' },
    ],
    status: {
      deleted: false,
    }
  },
  authenticated: true,
  isAdmin: true,
  isSuperAdmin: false,
  status: {
    fetching: false,
    deleting: false,
  },
  dispatch: () => { },
};

const alterProps = newProps => ({
  ...props,
  transactions: newProps.transactions || props.transactions,
  authenticated: newProps.authenticated === undefined ? true : newProps.authenticated,
  status: {
    fetching: newProps.fetching || false,
    deleting: newProps.deleting || false,
  }
});

describe('<Transactions />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Transactions {...props} />);
  })
  describe('Rendering:', () => {
    it('should render well on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to login page if the user is not authenticated', () => {
      wrapper.setProps(alterProps({ authenticated: false }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render well when fetching transactions', () => {
      wrapper.setProps(alterProps({ fetching: true, transactions: { centers: [], status: { ...props.status } } }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});