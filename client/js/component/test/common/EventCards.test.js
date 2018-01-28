import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCards from '../../common/EventCards.jsx';


const props = {
  events: [
    {
      id: 1,
      centerId: 1,
      userId: 1,
      title: 'test-event',
      description: 'test description',
      date: '12/34/2020',
      status: 'allowed',
    },
  ],
  centers: [
    { id: 1, name: 'test-center1' },
    { id: 2, name: 'test-center2' },
    { id: 3, name: 'test-center3' },
  ],
  edit: () => { },
  startDelete: () => { },
};

const alterProps = newProps => ({
  events: [...newProps.events],
  centers: props.centers,
  edit: () => { },
  startDelete: () => { },
});

describe('<EventCards />', () => {
  it('should render correcly when status is allowed', () => {
    const tree = renderer.create(
      <Router>
        <EventCards {...props} />
      </Router >
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly when status is canceled', () => {
    const newProps = alterProps({
      events: [
        { ...props.events[0], status: 'canceled' },
      ],
    });
    const tree = renderer.create(
      <Router>
        <EventCards {...newProps} />
      </Router >
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
