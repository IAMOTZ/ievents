import React from 'react';
import Profile from '../../../components/containers/Profile';
import ProfileView from '../../../components/containers/Profile/View';
import DeleteAccountModal from '../../../components/containers/Profile/DeleteAccountModal';
import ChangePasswordModal from '../../../components/containers/Profile/ChangePasswordModal';

describe('<Profile />', () => {
  const props = {
    userName: 'tester',
    userToken: 'sampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    events: [],
    changingPasswordStarted: false,
    changingPasswordResolved: false,
    changingPasswordError: null,
    deletingAccountStarted: false,
    deletingAccountResolved: false,
    deletingAccountError: null,
    dispatch: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Profile {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<Profile {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_DID_MOUNT', () => {
      it('should dispatch an action', () => {
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('COMOPONENT_WILL_RECIEVE_PROPS', () => {
      it('should dispatch an action if deleting account resolved', () => {
        props.dispatch.mockReset();
        wrapper.setProps(alterProps({ deletingAccountResolved: true }));
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('COMOPONENT_WILL_UNMOUNT', () => {
      it('should dispatch two actions', () => {
        props.dispatch.mockReset();
        wrapper.unmount();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('GET_INPUT', () => {
      it('should update the state with user input', () => {
        const userInput = 'newPassword123';
        const fakeEvent = { target: { name: 'newPassword', value: userInput } };
        wrapperInstance.getInput(fakeEvent);
        expect(wrapper.state('newPassword')).toEqual(userInput);
      });
    });

    describe('CLEAR_INPUTS', () => {
      it('should clear the user inputs from the state', () => {
        wrapper.setState({ formerPassword: 'myFormerPassword' });
        wrapperInstance.clearInputs();
        expect(wrapper.state('formerPassword')).toEqual('');
      });
    });

    describe('CLEAR_INPUT_ERRORS', () => {
      it('should clear input errors in the state', () => {
        const passwordError = 'Password is required';
        wrapper.setState({ inputErrors: { passwordError } });
        wrapperInstance.clearInputErrors();
        expect(wrapper.state('inputErrors').passwordError).toBeNull();
      });
    });

    describe('KILL_ASYNC_PROCESS', () => {
      it('should dispatch two actions', () => {
        props.dispatch.mockReset();
        wrapperInstance.killAsyncProcess();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('CLOSE_MODAL_EFFECT', () => {
      it('should clear user inputs in the state', () => {
        wrapper.setState({ formerPassword: 'myFormerPassword' });
        wrapperInstance.closeModalEffects();
        expect(wrapper.state('formerPassword')).toEqual('');
      });
      it('should dispatch two actions', () => {
        props.dispatch.mockReset();
        wrapperInstance.closeModalEffects();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('CHANGE_PASSWORD', () => {
      it('should dispatch an action and set inputErros if validation fails', () => {
        const emptyPassword = '';
        wrapper.setState({ formerPassword: emptyPassword });
        props.dispatch.mockReset();
        wrapperInstance.changePassword();
        expect(typeof wrapper.state('inputErrors').formerPasswordError).toEqual('string');
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
      it('should dispatch two acitons and clear inputErrors if validation pass', () => {
        const correctData = {
          formerPassword: 'Formerpassword123',
          newPassword: 'Newpassword123',
          confirmNewPassword: 'Newpassword123',
        };
        const previousError = 'Former password is required';
        wrapper.setState({
          ...correctData, inputErrors: { formerPasswordError: previousError }
        });
        props.dispatch.mockReset();
        wrapperInstance.changePassword();
        expect(wrapper.state('inputErrors').formerPasswordError).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('DELETE_ACCOUNT', () => {
      it('should dispatch an action and set inputErros if validation fails', () => {
        const emptyPassword = '';
        wrapper.setState({ password: emptyPassword });
        props.dispatch.mockReset();
        wrapperInstance.deleteAccount();
        expect(typeof wrapper.state('inputErrors').passwordError).toEqual('string');
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
      it('should dispatch two acitons and clear inputErrors if validation pass', () => {
        const correctData = { password: 'Password123' };
        const previousError = 'Password is required';
        wrapper.setState({
          ...correctData, inputErrors: { passwordError: previousError }
        });
        props.dispatch.mockReset();
        wrapperInstance.deleteAccount();
        expect(wrapper.state('inputErrors').passwordError).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });
  });
});

describe('<ProfileView />', () => {
  const props = {
    userName: 'tester',
    isAdmin: false,
    isSuperAdmin: false,
    dispatch: jest.fn(),
    events: [],
    changingPasswordStarted: false,
    changingPasswordError: null,
    changingPasswordResolved: false,
    deletingAccountStarted: false,
    deletingAccountError: null,
    formerPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    password: '',
    inputErrors: {},
    getInput: () => { },
    closeModalEffects: () => { },
    deleteAccount: () => { },
    changePassword: () => { },
  };
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProfileView {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<ChangePasswordModal />', () => {
  const props = {
    changingPasswordStarted: false,
    changingPasswordError: null,
    changingPasswordResolved: false,
    formerPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    inputErrors: {},
    getInput: () => { },
    closeModalEffects: () => { },
    changePassword: () => { },
  };
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ChangePasswordModal {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<DeleteAccountModal />', () => {
  const props = {
    deletingAccountStarted: false,
    deletingAccountError: null,
    password: null,
    inputErrors: {},
    getInput: () => {},
    closeModalEffects: () => {},
    deleteAccount: () => {},
  };
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<DeleteAccountModal {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

