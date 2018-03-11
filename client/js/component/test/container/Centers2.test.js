/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Centers2 from '../../container/Centers2';

const props = {
  authenticated: true,
  user: { name: 'test-user' },
  centers: [
    { id: 1, name: 'test-center1' },
    { id: 2, name: 'test-center2' },
  ],
  modalContent: {
    name: null,
    images: [],
    details: null,
    capacity: null,
    price: null,
    bookedOn: [],
    type: null,
  },
  isAdmin: true,
  isSuperAdmin: false,
  status: {
    fetching: false,
  },
  dispatch: () => { },
};

const alterProps = newProps => ({
  ...props,
  centers: newProps.centers || props.centers,
  authenticated: newProps.authenticated === undefined ? true : newProps.authenticated,
  status: {
    fetching: newProps.fetching || false,
  },
});

describe('<Centers2 />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Centers2 {...props} />);
    })
    it('should render well on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to login page is user is not authenticated', () => {
      wrapper.setProps(alterProps({ authenticated: false }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render well when fetching centers', () => {
      wrapper.setProps(alterProps({ fetching: true, centers: [] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
