import React from 'react';
import CenterCards from '../../../components/common/CenterCards';
import {
  RenderCenterBody, RenderCenterBodyInTransactions,
} from '../../../components/common/CenterCards/subComponents';

const sampleCenter = {
  id: 1,
  name: 'test-center1',
  location: 'test-center-location',
  details: 'test-center-details',
  capacity: '200',
  price: '500',
  images: ['http://testImage.jpg'],
};

describe('<CenterCards />', () => {
  const props = {
    centers: [sampleCenter],
    createModalContent: jest.fn(),
    isAdmin: false,
    onBook: jest.fn(),
    onEdit: jest.fn(),
    onViewTransactions: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CenterCards {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly on Events page', () => {
      expect(wrapper.first().shallow()).toMatchSnapshot();
    });
    it('should render correctly on Transactions page', () => {
      wrapper.setProps(alterProps({ isTransactionsPage: true }));
      expect(wrapper.first().shallow()).toMatchSnapshot();
    });
    it('should use the default image if an image is not given in props', () => {
      wrapper.setProps(alterProps({ centers: [{ ...sampleCenter, images: null }] }));
      expect(wrapper.first().shallow()).toMatchSnapshot();
    });
  });
});

describe('<RenderCenterBody />', () => {
  const props = {
    center: sampleCenter,
    createModalContent: jest.fn(),
    isAdmin: false,
    onBook: jest.fn(),
    onEdit: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RenderCenterBody {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly when the user is not an admin', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when the user is an admin', () => {
      wrapper.setProps(alterProps({ isAdmin: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Interactions:', () => {
    it('should call the function attached to the `About center` link', () => {
      wrapper.find('a[href="#center-details-modal"]').simulate('click');
      expect(props.createModalContent.mock.calls.length).toEqual(1);
    });
  });
});

describe('<RenderCenterBodyInTransactions />', () => {
  const props = {
    center: sampleCenter,
    onViewTransactions: jest.fn(),
  };
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<RenderCenterBodyInTransactions {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
