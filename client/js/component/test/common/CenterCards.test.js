import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CenterCards from '../../common/CenterCards.jsx';

const props = {
  centers: [
    {
      id: 1,
      name: 'test-center1',
      location: 'test-center-location',
      details: 'test-center-details',
      capacity: '200',
      price: '500',
      images: ['http://testImage.jpg'],
      bookedOn: ['02/12/2016', '02/12/2017', '02/12/2018'],
    },
  ],
  isAdmin: false,
  editAction: () => { },
  btnAction: () => { },
};

const alterProps = newProps => ({
  centers: [...newProps.centers],
  isAdmin: Boolean(newProps.isAdmin),
  editAction: () => { },
  btnAction: () => { },
});

describe('<CenterCards />', () => {
  it('should render correctly if it is a normal user', () => {
    const tree = renderer.create(
      <Router>
        <CenterCards {...props} />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if it is an admin user', () => {
    const newProps = alterProps({
      centers: props.centers,
      isAdmin: true,
    });
    const tree = renderer.create(
      <Router>
        <CenterCards {...newProps} />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render with the default image if no image was passed in', () => {
    const newProps = alterProps({
      centers: [{ ...props.centers, images: null }],
    });
    const tree = renderer.create(
      <Router>
        <CenterCards {...newProps} />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
