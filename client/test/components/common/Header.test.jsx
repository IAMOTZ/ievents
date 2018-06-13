import React from 'react';
import Header from '../../../components/common/Header';

describe('<Header />', () => {
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Header text="I am testing" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
