import React from 'react';
import FakeDiv from '../../../components/hoc/FakeDiv';

describe('<FakeDiv />', () => {
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const childComponent = <p>I am wrapped by a fake div</p>;
      const wrapper = shallow(<FakeDiv>{childComponent}</FakeDiv>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
