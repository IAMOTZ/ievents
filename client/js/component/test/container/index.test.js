/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Home from '../../container/index.jsx';

const props = {
  isUserFetched: false,
};

describe('<Home />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Home {...props} />);
    })
    it('should render correctly on page load', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to add event page is the user has alreadylogged in', () => {
      wrapper.setProps({ isUserFetched: true });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
