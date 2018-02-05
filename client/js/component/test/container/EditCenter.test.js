/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import EditCenter from '../../container/EditCenter.jsx';

const props = {
  user: { name: 'test-user' },
  authenticated: true,
  isAdmin: true,
  isSuperAdmin: false,
  toEdit: {
    name: 'test-center',
    location: 'test-location',
    details: 'test-details',
    capacity: 200,
    price: 100,
    images: null,
  },
  status: {
    updating: false,
    success: false,
    error: false,
  },
  dispatch: () => { },
};

const alterProps = newProps => ({
  user: newProps.user || props.user,
  authenticated: newProps.authenticated === undefined ? true : newProps.authenticated,
  isAdmin: newProps.isAdmin === undefined ? true : newProps.isAdmin,
  isSuperAdmin: newProps.isSuperAdmin || false,
  toEdit: {
    ...props.toEdit,
    ...newProps.toEdit,
  },
  status: {
    updating: newProps.updating || false,
    success: newProps.success || false,
    error: newProps.error || false,
  },
  dispatch: () => { },
});

describe('<EditCenter />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditCenter {...props} />);
    })
    describe('Rendering:', () => {
      it('should render correctly on page load', () => {
        expect(wrapper).toMatchSnapshot();
      });
      it('should redirect to login page if user is not authenticated', () => {
        wrapper.setProps(alterProps({ authenticated: false }));
        expect(wrapper).toMatchSnapshot();
      });
      it('should redirect to centers page if center is successfully updated', () => {
        wrapper.setProps(alterProps({ success: true }));
        expect(wrapper).toMatchSnapshot();
      });
      it('should render correcty when updating', () => {
        wrapper.setProps(alterProps({ updating: true }));
        expect(wrapper).toMatchSnapshot();
      });
      it('should render correctly when there is an error', () => {
        wrapper.setProps(alterProps({ error: 'there was an error' }));
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('Behaviour:', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<EditCenter {...props} />);
      });
      it('should update the state when the user keys in the center name', () => {
        const name = 'test-center-updated';
        wrapper
          .find('#name')
          .simulate('change', { target: { name: 'name', value: name } });
        expect(wrapper.state('name')).toEqual(name);
      });
      it('should update the state when the user keys in the center location', () => {
        const location = 'test-location-updated';
        wrapper
          .find('#location')
          .simulate('change', { target: { name: 'location', value: location } });
        expect(wrapper.state('location')).toEqual(location);
      });
      it('should update the state when the user keys in the center details', () => {
        const details = 'test-details-updated';
        wrapper
          .find('#details')
          .simulate('change', { target: { name: 'details', value: details } });
        expect(wrapper.state('details')).toEqual(details);
      });
      it('should update the state when the user keys in the center capacity', () => {
        const capacity = 50;
        wrapper
          .find('#capacity')
          .simulate('change', { target: { name: 'capacity', value: capacity } });
        expect(wrapper.state('capacity')).toEqual(capacity);
      });
      it('should update the state when the user keys in the center price', () => {
        const price = 40;
        wrapper
          .find('#price')
          .simulate('change', { target: { name: 'price', value: price } });
        expect(wrapper.state('price')).toEqual(price);
      });
    });
  });
});
