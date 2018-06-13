import React from 'react';
import Transactions from '../../../components/containers/Transactions';
import TransactionsView from '../../../components/containers/Transactions/View';

const sampleTransaction = {
  id: 1,
  centerId: 1,
  userId: 1,
  title: 'test-event',
  description: 'test description',
  date: '12/34/2020',
  status: 'allowed',
  user: {
    email: 'tester@gmail.com'
  }
};

describe('<Transactions />', () => {
  const props = {
    userName: 'tester',
    userToken: 'sampleToken',
    isAdmin: false,
    isSuperAdmin: false,
    centerToTransact: 3,
    transactions: [sampleTransaction],
    pagination: {},
    fetchingTransactionsStarted: false,
    cancelingTransactionStarted: false,
    cancelingTransactionResolved: false,
    dispatch: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Transactions {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to the centers-as-transactions page if there is no center to transact', () => {
      wrapper.setProps(alterProps({ centerToTransact: null }));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour:', () => {
    let wrapper; let wrapperInstance;
    beforeEach(() => {
      props.dispatch.mockReset();
      wrapper = shallow(<Transactions {...props} />);
      wrapperInstance = wrapper.instance();
    });
    // The names on the following test block refers
    // to the instance method that handles the behaviour tested.
    describe('COMOPONENT_WILL_MOUNT', () => {
      it('should dispatch an action', () => {
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });
    describe('COMOPONENT_WILL_RECIEVE_PROPS', () => {
      it('should dispatch two actions and remove the center to cancel from the state if canceling transaciton resolved', () => {
        props.dispatch.mockReset();
        wrapper.setProps(alterProps({ cancelingTransactionResolved: true }));
        expect(wrapper.state('toCancel')).toBeNull();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });
    describe('REFRESH', () => {
      it('should dispatch two actions', () => {
        props.dispatch.mockReset();
        wrapperInstance.refresh();
        expect(props.dispatch.mock.calls.length).toEqual(2);
      });
    });

    describe('START_EVENT_CANCEL', () => {
      it('should update the state with id of event to cancel', () => {
        const fakeEvent = { currentTarget: { id: sampleTransaction.id } };
        wrapperInstance.startEventCancel(fakeEvent);
        expect(wrapper.state('toCancel')).toEqual(sampleTransaction.id);
      });
    });

    describe('REFRESH', () => {
      it('should dispatch an actions', () => {
        props.dispatch.mockReset();
        wrapperInstance.finishEventCancel();
        expect(props.dispatch.mock.calls.length).toEqual(1);
      });
    });

    describe('STOP_EVENT_CANCEL', () => {
      it('should remove the id of event to cancel from the state', () => {
        wrapperInstance.stopEventCancel();
        expect(wrapper.state('toCancel')).toBeNull();
      });
    });

    describe('CREATE_MODAL_CONTENT', () => {
      it('should update the state with the content of a modal', () => {
        wrapperInstance.createModalContent(sampleTransaction);
        expect(wrapper.state('modalContent')).toEqual({
          eventTitle: sampleTransaction.title,
          eventDescription: sampleTransaction.description,
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

describe('<TransactionsView />', () => {
  const props = {
    userName: 'tester',
    isAdmin: false,
    isSuperAdmin: false,
    dispatch: jest.fn(),
    transactions: [],
    startEventCancel: () => {},
    fetchingTransactionsStarted: false,
    cancelingTransactionStarted: false,
    finishEventCancel: () => {},
    stopEventCancel: () => {},
    createModalContent: () => {},
    modalContent: {},
    pagination: {},
    updatePagination: () => {},
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TransactionsView {...props} />);
    });
    it('should render correctly when there are no transactions and it is fetching', () => {
      wrapper.setProps(alterProps({ fetchingTransactionsStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there are transactions and it is not fetching', () => {
      wrapper.setProps(alterProps({ events: [sampleTransaction] }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
