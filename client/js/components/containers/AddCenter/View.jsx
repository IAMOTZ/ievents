import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import { AuthTopNavigation } from '../../common/TopNavigation';
import CenterForm from './CenterForm';

const View = props => (
  <div className="add-center-container">
    <AuthTopNavigation
      name={props.userName}
      title="Add a center"
      isAdmin={props.isAdmin}
      isSuperAdmin={props.isSuperAdmin}
      dispatch={props.dispatch}
    />
    <div className="container-fluid">
      <div className="row">
        <SideNavigation
          name={props.userName}
          isAdmin={props.isAdmin}
          isSuperAdmin={props.isSuperAdmin}
          dispatch={props.dispatch}
        />
        <div className="col-lg-10 offset-md-2" id="add-event-section">
          <Header text="Add a center" />
          <CenterForm
            addingCenterStarted={props.addingCenterStarted}
            addingCenterError={props.addingCenterError}
            getInput={props.getInput}
            inputErrors={props.inputErrors}
            handleImageDrop={props.handleImageDrop}
            images={props.images}
            add={props.add}
          />
        </div>
      </div>
    </div>
    <footer className="d-block d-sm-none mt-5">
      <div className="container text-white text-center py-5">
        <h1>Ievents</h1>
        <p>Copyright &copy; 2017</p>
      </div>
    </footer>
  </div>
);

View.defaultProps = {
  addingCenterError: '',
  inputErrors: {},
  images: [],
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  addingCenterStarted: PropTypes.bool.isRequired,
  addingCenterError: PropTypes.string,
  inputErrors: PropTypes.object,
  images: PropTypes.array,
  add: PropTypes.func.isRequired,
  getInput: PropTypes.func.isRequired,
  handleImageDrop: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default View;
