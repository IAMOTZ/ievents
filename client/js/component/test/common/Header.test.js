import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../common/Header.jsx';


describe('<Header />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Header text="Testing Header"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
