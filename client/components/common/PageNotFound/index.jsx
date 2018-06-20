import React from 'react';
import { Link } from 'react-router-dom';
import FakeDiv from '../../common/FakeDiv';
import Footer from '../Footer';
import './styles.scss';

const PageNotFound = () => (
  <FakeDiv>
    <div id="page-not-found">
      <div className="page-content">
        <h1 className="display-1">Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <span className="d-block">Click <Link to="/explore/centers">here</Link> to go back to the centers page.</span>
      </div>
    </div>
    <Footer />
  </FakeDiv>
);

export default PageNotFound;
