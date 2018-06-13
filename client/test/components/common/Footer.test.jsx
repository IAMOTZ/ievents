import React from 'react';
import Footer from '../../../components/common/Footer';

describe('<Footer />', () => {
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Footer />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
