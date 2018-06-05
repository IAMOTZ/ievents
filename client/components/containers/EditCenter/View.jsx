import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import { AuthTopNavigation } from '../../common/TopNavigation';
import CenterForm from '../AddCenter/CenterForm';

const View = props => (
  <div className="add-center-container">
    <AuthTopNavigation
      name={props.userName}
      title="Edit Center"
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
          <Header text="Edit Center" />
          <div className="page-content">
            <CenterForm
              updatingCenterStarted={props.updatingCenterStarted}
              updatingCenterError={props.updatingCenterError}
              getInput={props.getInput}
              inputErrors={props.inputErrors}
              handleImageDrop={props.handleImageDrop}
              images={props.images}
              update={props.update}
              toUpdate={props.toUpdate}
            />
          </div>
        </div>
      </div>
    </div>
    <footer className="d-block d-sm-none mt-5">
      <div className="container text-white text-center py-5">
        <h1>iEvents</h1>
        <p>Copyright &copy; 2017</p>
      </div>
    </footer>
  </div>
);

View.defaultProps = {
  updatingCenterError: '',
  inputErrors: {},
  images: [],
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  updatingCenterStarted: PropTypes.bool.isRequired,
  updatingCenterError: PropTypes.string,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  handleImageDrop: PropTypes.func.isRequired,
  images: PropTypes.array,
  update: PropTypes.func.isRequired,
  toUpdate: PropTypes.object.isRequired,
};

export default View;
