import React from 'react';
import Home from '../../../components/containers/Home';
import HomeView from '../../../components/containers/Home/View';

describe('<Home />', () => {
  const props = {
    isUserAuthenticated: false,
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Home {...props} />);
    });
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should redirect to centers page if user is authenticated', () => {
      wrapper.setProps(alterProps({ isUserAuthenticated: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<HomeView />', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<HomeView />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
