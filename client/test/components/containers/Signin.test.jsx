import React from 'react';
import Signin from '../../../components/containers/Signin';
import SigninView from '../../../components/containers/Signin/View';

const mockEvent = target => ({
  preventDefault: jest.fn(), target,
});

const sampleUserData = {
  email: 'tester@gmail.com',
  password: 'Password123',
};

describe('<Signin />', () => {
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
      wrapper = shallow(<Signin {...props} />);
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
      wrapper = shallow(<Signin {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = sampleUserData.email;
        wrapperInstance.getInput(mockEvent({ name: 'email', value: userInput }));
        expect(wrapper.state('email')).toEqual(userInput);
      });
    });
    describe('CLEAR_INPUT_ERRORS', () => {
      it('should clear input errors in the state', () => {
        const emailError = 'You name has errors';
        wrapper.setState({ inputErrors: { emailError } });
        wrapperInstance.clearInputErrors();
        expect(wrapper.state('inputErrors').emailError).toBeNull();
      });
    });

    describe('LOGIN', () => {
      it('should dispatch an action and set inputErrors if validation fails', () => {
        const wrongEmail = 'tester.com';
        wrapper.setState({ email: wrongEmail });
        wrapperInstance.login(mockEvent());
        expect(props.dispatch.mock.calls.length).toEqual(1);
        expect(typeof wrapper.state('inputErrors').emailError).toEqual('string');
      });
      it('should clear inputErrors and dispatch 2 actions if validation pass', () => {
        const previousError = 'Email is required';
        wrapper.setState({
          ...sampleUserData, inputErrors: { emailError: previousError }
        });
        wrapperInstance.login(mockEvent());
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

describe('<SigninView />', () => {
  const props = {
    getInput: jest.fn(),
    inputErrors: {},
    loggingUserError: null,
    loggingUserStarted: false,
    login: jest.fn(),
  };
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SigninView {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
