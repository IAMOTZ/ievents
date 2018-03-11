import React from 'react';
import renderer from 'react-test-renderer';
import CenterDropDown from '../../common/CenterDropDown';

const props = {
  centers: [
    { id: 1, name: 'test-center1' },
    { id: 2, name: 'test-center2' },
    { id: 3, name: 'test-center3' },
  ],
};

describe('<CenterDropDown />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<CenterDropDown {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
