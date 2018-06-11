import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

// Configuring mock store.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Configuring Enzyme
Enzyme.configure({ adapter: new Adapter() });

// Make this APIs available in all test files without importing.
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.mockStore = mockStore;
global.moxios = moxios;
