/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Centers1 from '../../container/Centers1.jsx';

const props = {
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
  isUserFetched: false,
  status: {
    fetching: false,
  },
  dispatch: () => { },
}

const alterProps = newProps => ({
  ...props,
  centers: newProps.centers || props.centers,
  isUserFetched: newProps.isUserFetched || false,
  status: {
    fetching: newProps.fetching || false,
  },
});

describe('<Centers1 />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Centers1 {...props} />);
    });
    it('should render well on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to addEvent page if user is already logged in', () => {
      wrapper.setProps(alterProps({ isUserFetched: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render well when fetching centers', () => {
      wrapper.setProps(alterProps({ fetching: true, centers: [] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
