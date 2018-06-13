import React from 'react';
import Pagination from '../../../components/common/Pagination';

const props = {
  pageCount: 0,
  onPageChange: jest.fn()
};

const alterProps = newProps => ({ ...props, ...newProps });

describe('<Pagination />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Pagination {...props} />);
    });
    it('should render correctly when paginationCount is less than one', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when paginationCount is greater than one', () => {
      wrapper.setProps(alterProps({ pageCount: 5 }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
