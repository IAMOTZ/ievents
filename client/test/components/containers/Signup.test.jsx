import React from 'react';
import Signup from '../../../components/containers/Signup';
import SignupView from '../../../components/containers/Signup/View';

const mockEvent = target => ({
  preventDefault: jest.fn(), target,
});

const sampleUserData = {
  name: 'tester',
  email: 'tester@gmail.com',
  password: 'Password123',
  confirmPassword: 'Password123'
};

describe('<Signup />', () => {
  const props = {
    dispatch: jest.fn(),
    loggingUserStarted: false,
    loggingUserResolved: false,
    loggingUserError: null,
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Signup {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to centers page if logging resolved', () => {
      wrapper.setProps(alterProps({ loggingUserResolved: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<Signup {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = 'tester';
        wrapperInstance.getInput(mockEvent({ name: 'name', value: userInput }));
        expect(wrapper.state('name')).toEqual(userInput);
      });
    });
    describe('CLEAR_INPUT_ERRORS', () => {
      it('should clear input errors in the state', () => {
        const nameError = 'You name has errors';
        wrapper.setState({ inputErrors: { nameError } });
        wrapperInstance.clearInputErrors();
        expect(wrapper.state('inputErrors').nameError).toBeNull();
      });
    });

    describe('REGISTER', () => {
      it('should dispatch an action and set inputErrors if validation fails', () => {
        const wrongEmail = 'testergmail.com';
        wrapper.setState({ email: wrongEmail });
        wrapperInstance.register(mockEvent());
        expect(props.dispatch.mock.calls.length).toEqual(1);
        expect(typeof wrapper.state('inputErrors').emailError).toEqual('string');
      });
      it('should clear inputErrors and dispatch 2 actions if validation pass', () => {
        const previousError = 'Email is required';
        wrapper.setState({
          ...sampleUserData, inputErrors: { emailError: previousError }
        });
        wrapperInstance.register(mockEvent());
        expect(wrapper.state('inputErrors').emailError).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('COMOPONENT_WILL_UNMOUNT', () => {
      it('should dispatch an action when the component wants to unmount', () => {
        wrapper.unmount();
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
  });
});

describe('<SignupView />', () => {
  const props = {
    getInput: jest.fn(),
    inputErrors: {},
    loggingUserError: null,
    loggingUserStarted: false,
    register: jest.fn(),
  };
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SignupView {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
