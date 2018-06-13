import React from 'react';
import EditEvent from '../../../components/containers/EditEvent';

describe('<EditEvent />', () => {
  const props = {
    userName: 'tester',
    userToken: 'justASampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    eventToUpdate: { id: 5 },
    updatingEventStarted: false,
    updatingEventResolved: false,
    updatingEventError: null,
    dispatch: jest.fn()
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditEvent {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to the events page if updating event resolved', () => {
      wrapper.setProps(alterProps({ updatingEventResolved: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to the events page if there is no event to update', () => {
      wrapper.setProps(alterProps({ eventToUpdate: null }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<EditEvent {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = 'edited event';
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

    describe('UPDATE', () => {
      it('should dispatch an action and set inputErros if validation fails', () => {
        const emptyTitle = '';
        wrapper.setState({ title: emptyTitle });
        props.dispatch.mockReset();
        wrapperInstance.update();
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
        wrapperInstance.update();
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
