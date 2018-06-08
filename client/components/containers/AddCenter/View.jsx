import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { AuthTopNavigation } from '../../common/TopNavigation';
import CenterForm from './CenterForm';

// This component is reused in AddCenter and EditCenter container
const View = props => (
  <div id="add-center-container">
    <AuthTopNavigation
      name={props.userName}
      title={props.updating ? 'Edit Center' : 'Add a center'}
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
        <div className="col-lg-10 offset-md-2">
          <Header text={props.updating ? 'Edit Center' : 'Add a center'} />
          <div className="page-content">
            <CenterForm
              addingCenterStarted={props.addingCenterStarted}
              addingCenterError={props.addingCenterError}
              update={props.update}
              updating={props.updating}
              updatingCenterError={props.updatingCenterError}
              updatingCenterStarted={props.updatingCenterStarted}
              centerToUpdate={props.centerToUpdate}
              getInput={props.getInput}
              inputErrors={props.inputErrors}
              handleImageDrop={props.handleImageDrop}
              newImageLink={props.newImageLink}
              add={props.add}
            />
          </div>
        </div>
      </div>
    </div>
    <span className="d-block d-sm-none mt-5">
      <Footer />
    </span>
  </div>
);

View.defaultProps = {
  add: () => {},
  addingCenterError: null,
  addingCenterStarted: false,
  inputErrors: {},
  newImageLink: null,
  centerToUpdate: {},
  update: () => {},
  updating: false,
  updatingCenterError: null,
  updatingCenterStarted: false,
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  addingCenterStarted: PropTypes.bool,
  addingCenterError: PropTypes.string,
  inputErrors: PropTypes.object,
  newImageLink: PropTypes.string,
  add: PropTypes.func,
  getInput: PropTypes.func.isRequired,
  handleImageDrop: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  centerToUpdate: PropTypes.object,
  update: PropTypes.func,
  updating: PropTypes.bool,
  updatingCenterError: PropTypes.string,
  updatingCenterStarted: PropTypes.bool,
};

export default View;
