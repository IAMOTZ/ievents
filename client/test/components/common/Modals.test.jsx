import React from 'react';
import { ConfirmationModal, CenterDetailsModal, EventDetailsModal } from '../../../components/common/Modals';

describe('<ConfirmationModal />', () => {
  const props = {
    onCancel: jest.fn(),
    onOK: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    const childComponent = <p>I am the confirmation modal</p>;
    wrapper = shallow(<ConfirmationModal {...props}>{childComponent}</ConfirmationModal>);
  });
  describe('Rendering:', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Interactions:', () => {
    it('should call the function attached to the `No` button', () => {
      wrapper.find('button.btn.ie-dark-button').simulate('click');
      expect(props.onCancel.mock.calls.length).toEqual(1);
    });
    it('should call the function attached to the `Yes` button', () => {
      wrapper.find('button.btn.ie-blue-button').simulate('click');
      expect(props.onOK.mock.calls.length).toEqual(1);
    });
  });
});

describe('<CenterDetailsModal />', () => {
  const props = {
    centerName: 'Test Center',
    centerDetails: 'I am the test center',
    centerImages: null,
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CenterDetailsModal {...props} />);
  });
  describe('Rendering:', () => {
    it('should use default image when centerImages is not passed in props', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should use the image passed as centerImages in props', () => {
      wrapper.setProps(alterProps({ centerImages: ['https://linkToCenterImage'] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<EventDetailsModal />', () => {
  const props = {
    eventTitle: 'Test event',
    eventDescription: 'I am the test event',
  };
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<EventDetailsModal {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
