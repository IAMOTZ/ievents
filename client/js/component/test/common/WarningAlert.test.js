import React from 'react';
import renderer from 'react-test-renderer';
import WarningAlert from '../../common/WarningAlert.jsx';

describe('<WarningAlert />', () => {
  it('should render nothing if no message was passed in', () => {
    const wrapper = shallow(<WarningAlert />);
    expect(wrapper.html()).toBeNull();
  });
  it('should render the component if a message was passed in', () => {
    const tree = renderer.create(<WarningAlert message="Testing WarningAlert" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
