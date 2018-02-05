import React from 'react';
import Footer from '../../common/Footer.jsx';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
