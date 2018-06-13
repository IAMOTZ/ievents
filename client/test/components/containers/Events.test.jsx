import React from 'react';
import Events from '../../../components/containers/Events';
import EventsView from '../../../components/containers/Events/View';

const sampleEvent = {
  id: 1,
  centerId: 1,
  userId: 1,
  title: 'test-event',
  description: 'test description',
  date: '12/34/2020',
  status: 'allowed',
};

describe('<Events />', () => {
  const props = {
    userName: 'tester',
    userToken: 'sampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    fetchingEventsStarted: false,
    deletingEventStarted: false,
    deletingEventResolved: false,
    events: [sampleEvent],
    pagination: {},
    dispatch: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Events {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<Events {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_WILL_MOUNT', () => {
      it('should dispatch an action', () => {
        // As soon as the component is shallow rendered
        // the componentWillMount lifecycle method is called.
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('COMOPONENT_DID_UPDATE', () => {
      it('should dispatch two action if deleting event resolved', () => {
        props.dispatch.mockReset();
        wrapper.setProps(alterProps({ deletingEventResolved: true }));
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });
    describe('ON_EDIT', () => {
      it('should dispatch an action', () => {
        props.dispatch.mockReset();
        const fakeEvent = { currentTarget: { id: sampleEvent.id } };
        wrapperInstance.onEdit(fakeEvent);
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('START_DELETE', () => {
      it('should update the state with id of event to delete', () => {
        const fakeEvent = { currentTarget: { id: sampleEvent.id } };
        wrapperInstance.startDelete(fakeEvent);
        expect(wrapper.state('toDelete')).toEqual(sampleEvent.id);
      });
    });

    describe('FINISH_DELETE', () => {
      it('should dispatch an action and remove the event to delete form state', () => {
        props.dispatch.mockReset();
        wrapperInstance.finishDelete();
        expect(props.dispatch.mock.calls.length).toEqual(1);
        expect(wrapper.state('toDelete')).toBeNull();
      });
    });

    describe('CANCEL_DELETE', () => {
      it('should remove the id of event to delete form state', () => {
        wrapperInstance.cancelDelete();
        expect(wrapper.state('toDelete')).toBeNull();
      });
    });

    describe('CREATE_MODAL_CONTENT', () => {
      it('should update the state with the content of a modal', () => {
        wrapperInstance.createModalContent(sampleEvent);
        expect(wrapper.state('modalContent')).toEqual({
          eventTitle: sampleEvent.title,
          eventDescription: sampleEvent.description,
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

describe('<EventsView />', () => {
  const props = {
    userName: 'tester',
    isAdmin: false,
    isSuperAdmin: false,
    dispatch: jest.fn(),
    deletingEventStarted: false,
    fetchingEventsStarted: false,
    events: [],
    startDelete: jest.fn(),
    onEdit: jest.fn(),
    cancelDelete: jest.fn(),
    finishDelete: jest.fn(),
    pagination: {},
    updatePagination: jest.fn(),
    modalContent: {},
    createModalContent: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EventsView {...props} />);
    });
    it('should render correctly when there are no events and it is fetching', () => {
      wrapper.setProps(alterProps({ fetchingEventsStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there are events and it is not fetching', () => {
      wrapper.setProps(alterProps({ events: [sampleEvent] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
