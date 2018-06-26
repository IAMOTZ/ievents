import React from 'react';
import AuthCenters from '../../../components/containers/AuthCenters';
import AuthCentersView from '../../../components/containers/AuthCenters/View';

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
    isAdmin: false,
    isSuperAdmin: false,
    fetchingCenterStarted: false,
    centers: [sampleCenter],
    pagination: {},
    dispatch: jest.fn(),
  };
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AuthCenters {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<AuthCenters {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_WILL_MOUNT', () => {
      it('should dispatch an action', () => {
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('ON_EDIT', () => {
      it('should dispatch an action', () => {
        const fakeEvent = { target: { id: sampleCenter.id } };
        props.dispatch.mockReset();
        wrapperInstance.onEdit(fakeEvent);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('ON_BOOK', () => {
      it('should dispatch an action', () => {
        const fakeEvent = { target: { id: sampleCenter.id } };
        props.dispatch.mockReset();
        wrapperInstance.onBook(fakeEvent);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('ON_VIEW_TRANSACTIONS', () => {
      it('should dispatch an action', () => {
        const fakeEvent = { currentTarget: { id: sampleCenter.id } };
        props.dispatch.mockReset();
        wrapperInstance.onViewTransactions(fakeEvent);
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
        const fakePageData = { selected: 3 };
        props.dispatch.mockReset();
        wrapperInstance.updatePagination(fakePageData);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
  });
});

describe('<AuthCentersView />', () => {
  const props = {
    userName: 'tester',
    isAdmin: false,
    isSuperAdmin: false,
    dispatch: jest.fn(),
    isTransactionsPage: false,
    centers: [],
    fetchingCenterStarted: false,
    onEdit: jest.fn(),
    onBook: jest.fn(),
    onViewTransactions: jest.fn(),
    modalContent: {},
    createModalContent: jest.fn(),
    pagination: {},
    updatePagination: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AuthCentersView {...props} />);
    });
    it('should render correctly when there are no centers and it is fetching', () => {
      wrapper.setProps(alterProps({ fetchingCentersStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there are centers and it is not fetching', () => {
      wrapper.setProps(alterProps({ centers: [sampleCenter] }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly on transactions page', () => {
      wrapper.setProps(alterProps({ centers: [sampleCenter], isTransactionsPage: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
