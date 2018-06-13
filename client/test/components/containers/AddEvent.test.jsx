import React from 'react';
import AddEvent from '../../../components/containers/AddEvent';
import AddEventView from '../../../components/containers/AddEvent/View';
import EventForm from '../../../components/containers/AddEvent/EventForm';

describe('<AddEvent />', () => {
  const props = {
    userName: 'tester',
    userToken: 'justASampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    centerToBook: { id: 5 },
    addingEventStarted: false,
    addingEventResolved: false,
    addingEventError: null,
    dispatch: jest.fn()
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddEvent {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to the events page if adding events resolved', () => {
      wrapper.setProps(alterProps({ addingEventResolved: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to the centers page if there is no center to book', () => {
      wrapper.setProps(alterProps({ centerToBook: null }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<AddEvent {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_WILL_MOUNT', () => {
      it('should set the id of the center to book in the state', () => {
        expect(wrapper.state('centerId')).toEqual(String(props.centerToBook.id));
      });
    });

    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = 'cool event';
        const fakeEvent = { target: { name: 'title', value: userInput } };
        wrapperInstance.getInput(fakeEvent);
        expect(wrapper.state('title')).toEqual(userInput);
      });
    });

    describe('CLEAR_INPUT_ERRORS', () => {
      it('should clear input errors in the state', () => {
        const titleError = 'Event title is required';
        wrapper.setState({ inputErrors: { titleError } });
        wrapperInstance.clearInputErrors();
        expect(wrapper.state('inputErrors').titleError).toBeNull();
      });
    });

    describe('HANDLE_DATE_SELECTION', () => {
      it('should update the state with date input being formatted', () => {
        const date = new Date();
        const dateString = date.toDateString();
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        wrapperInstance.handleDateSelection(dateString);
        expect(wrapper.state('date')).toEqual(formattedDate);
      });
    });

    describe('ADD', () => {
      it('should dispatch an action and set inputErros if validation fails', () => {
        const emptyTitle = '';
        wrapper.setState({ title: emptyTitle });
        props.dispatch.mockReset();
        wrapperInstance.add();
        expect(typeof wrapper.state('inputErrors').titleError).toEqual('string');
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
      it('should dispatch two acitons and clear inputErrors if validation pass', () => {
        const correctEventData = {
          title: 'test event',
          description: 'this is the test event',
          date: '2018/06/10',
        };
        const previousError = 'Title is required';
        wrapper.setState({
          ...correctEventData, inputErrors: { titleError: previousError }
        });
        props.dispatch.mockReset();
        wrapperInstance.add();
        expect(wrapper.state('inputErrors').titleError).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('COMOPONENT_WILL_UNMOUNT', () => {
      it('should dispatch an action', () => {
        props.dispatch.mockReset();
        wrapper.unmount();
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
  });
});

describe('<AddEventView />', () => {
  const props = {
    getInput: () => { },
    inputErrors: {},
    userName: 'tester',
    isAdmin: false,
    isSuperAdmin: false,
    dispatch: () => { },
    add: () => { },
    addingEventStarted: false,
    addingEventError: null,
    update: () => { },
    updating: false,
    updatingEventStarted: false,
    updatingEventError: null,
    centerToBook: {},
    eventToUpdate: {},
    handleDateSelection: () => { },
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddEventView {...props} />);
    });
    it('should render correctly when adding', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when updating', () => {
      wrapper.setProps(alterProps({ updating: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<EventForm />', () => {
  const props = {
    addingEventStarted: false,
    updatingEventStarted: false,
    getInput: () => {},
    inputErrors: {},
    eventToUpdate: {},
    add: () => {},
    update: () => {},
    updating: false,
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EventForm {...props} />);
    });
    it('should render correctly when adding', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when updating', () => {
      wrapper.setProps(alterProps({ updating: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should disable the create/update button when updating/adding event starts', () => {
      wrapper.setProps(alterProps({ addingEventStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
