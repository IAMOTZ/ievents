import React from 'react';
import AddAdmin from '../../../components/containers/AddAdmin';
import AddAdminView from '../../../components/containers/AddAdmin/View';


describe('<AddAdmin />', () => {
  const props = {
    userName: 'tester',
    userToken: 'justASampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    addingAdminStarted: false,
    addingAdminResolved: false,
    addingAdminError: null,
    dispatch: jest.fn()
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddAdmin {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<AddAdmin {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = 'tester@gmail.com';
        wrapperInstance.getInput({ target: { name: 'email', value: userInput } });
        expect(wrapper.state('email')).toEqual(userInput);
      });
      it('should dispatch an action if adding admin already resolved', () => {
        wrapper.setProps(alterProps({ addingAdminResolved: true }));
        wrapperInstance.getInput({});
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('CLEAR_INPUT_ERRORS', () => {
      it('should clear input errors in the state', () => {
        const emailError = 'Email is required';
        wrapper.setState({ inputErrors: { emailError } });
        wrapperInstance.clearInputErrors();
        expect(wrapper.state('inputErrors').emailError).toBeNull();
      });
    });

    describe('ADD', () => {
      it('should set inputErros if validation fails', () => {
        const wrongEmail = 'testergmail.com';
        wrapper.setState({ email: wrongEmail });
        wrapperInstance.add();
        expect(typeof wrapper.state('inputErrors').emailError).toEqual('string');
      });
      it('should clear inputErrors and dispatch action if validation pass', () => {
        const correctEmail = 'tester@gmail.com';
        const previousError = 'Email is required';
        wrapper.setState({
          email: correctEmail, inputErrors: { emailError: previousError }
        });
        wrapperInstance.add();
        expect(wrapper.state('inputErrors').emailError).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('REFRESH', () => {
      it('should dispatch an action', () => {
        wrapperInstance.refresh();
        expect(props.dispatch.mock.calls.length).toEqual(1);
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

describe('<AddAdminView />', () => {
  const props = {
    add: jest.fn(),
    addingAdminError: null,
    addingAdminStarted: false,
    addingAdminResolved: false,
    dispatch: jest.fn(),
    getInput: jest.fn(),
    isAdmin: false,
    isSuperAdmin: false,
    newAdmin: 'newAdmin@gmail.com',
    userName: 'tester',
    userToken: 'justASampleToken',
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddAdminView {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render an alert when adding admin resolves', () => {
      wrapper.setProps(alterProps({ addingAdminResolved: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
