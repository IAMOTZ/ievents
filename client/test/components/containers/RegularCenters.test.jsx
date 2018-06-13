import React from 'react';
import RegularCenters from '../../../components/containers/RegularCenters';
import RegularCentersView from '../../../components/containers/RegularCenters/View';

const sampleCenter = {
  id: 1,
  name: 'test-center1',
  location: 'test-center-location',
  details: 'test-center-details',
  capacity: '200',
  price: '500',
  images: ['http://testImage.jpg'],
};

describe('<RegularCenters />', () => {
  const props = {
    isUserAuthenticaed: false,
    fetchingCenterStarted: false,
    centers: [sampleCenter],
    pagination: {},
    dispatch: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegularCenters {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to centers page if user is authenticated', () => {
      wrapper.setProps(alterProps({ isUserAuthenticaed: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<RegularCenters {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_WILL_MOUNT', () => {
      it('should dispatch an action', () => {
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('ON_BOOK', () => {
      it('should dispatch an action', () => {
        props.dispatch.mockReset();
        wrapperInstance.onBook(sampleCenter.id);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('CREATE_MODAL_CONTENT', () => {
      it('should update the state with the content of a modal', () => {
        wrapperInstance.createModalContent(sampleCenter);
        expect(wrapper.state('modalContent')).toEqual({
          centerName: sampleCenter.name,
          centerImages: sampleCenter.images,
          centerDetails: sampleCenter.details
        });
      });
    });

    describe('UPDATE_PAGINATION', () => {
      it('should dispatch an action', () => {
        props.dispatch.mockReset();
        const fakePageData = { selected: 3 };
        wrapperInstance.updatePagination(fakePageData);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
  });
});

describe('<RegularCentersView />', () => {
  const props = {
    centers: [],
    onBook: jest.fn(),
    fetchingCenterStarted: false,
    pagination: {},
    updatePagination: jest.fn(),
    modalContent: {},
    createModalContent: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegularCentersView {...props} />);
    });
    it('should render correctly when there are no centers and it is fetching', () => {
      wrapper.setProps(alterProps({ fetchingCenterStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there are centers and it is not fetching', () => {
      wrapper.setProps(alterProps({ centers: [sampleCenter] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
