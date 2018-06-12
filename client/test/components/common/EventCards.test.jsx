import React from 'react';
import EventCards from '../../../components/common/EventCards';
import {
  RenderEventBody, RenderEventBodyInTransactions,
  RenderEventDescription, RenderEventFooter
} from '../../../components/common/EventCards/subComponents';

const sampleEvent = {
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

describe('<EventCards />', () => {
  const props = {
    isTransactionsPage: false,
    events: [sampleEvent],
    edit: jest.fn(),
    cancelingTransactionStarted: false,
    createModalContent: jest.fn(),
    startEventCancel: jest.fn(),
    startDelete: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventCards {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly on Events page', () => {
      expect(wrapper.first().shallow()).toMatchSnapshot();
    });
    it('should render correctly on Transactions page', () => {
      wrapper.setProps(alterProps({ isTransactionsPage: true }));
      expect(wrapper.first().shallow()).toMatchSnapshot();
    });
  });
});

describe('<RenderEventBody />', () => {
  const props = {
    event: sampleEvent,
    createModalContent: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RenderEventBody {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when the event is not allowed', () => {
      wrapper.setProps(alterProps({ event: { ...sampleEvent, status: 'canceled' } }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<RenderEventBodyInTransactions />', () => {
  const props = {
    cancelingTransactionStarted: false,
    createModalContent: jest.fn(),
    event: sampleEvent,
    startEventCancel: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RenderEventBodyInTransactions {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when cancelingTransactionStarted in props is true', () => {
      wrapper.setProps(alterProps({ cancelingTransactionStarted: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<RenderEventDescription />', () => {
  const props = {
    createModalContent: jest.fn(),
    event: sampleEvent,
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RenderEventDescription {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly when description is less than 100 chars', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render truncated text when description is greater 100chars', () => {
      const longDescription = Array.from({ length: 120 }, () => 'x').join('');
      wrapper.setProps(alterProps({ event: { ...props.event, description: longDescription } }));
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Interactions:', () => {
    it('should call the function attached to the `Read more` link when description is more that 100chars', () => {
      const longDescription = Array.from({ length: 120 }, () => 'x').join('');
      wrapper.setProps(alterProps({ event: { ...props.event, description: longDescription } }));
      wrapper.find('a[href="#event-details-modal"]').simulate('click');
      expect(props.createModalContent.mock.calls.length).toEqual(1);
    });
  });
});


describe('<RenderEventFooter />', () => {
  const props = {
    edit: jest.fn(),
    event: sampleEvent,
    startDelete: jest.fn(),
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RenderEventFooter {...props} />);
  });
  describe('Rendering:', () => {
    it('should render correctly when event is allowed', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when event is canceled', () => {
      wrapper.setProps(alterProps({ event: { ...sampleEvent, status: 'canceled' } }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when event is done', () => {
      wrapper.setProps(alterProps({ event: { ...sampleEvent, status: 'done' } }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
