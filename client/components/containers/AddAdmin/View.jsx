import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

const View = props => (
  <div id="add-admin-container">
    {/* Top navigation on small screen */}
    <SideNavigation
      name={props.userName}
      isAdmin={props.isAdmin}
      isSuperAdmin={props.isSuperAdmin}
      dispatch={props.dispatch}
    />
    <div className="container-fluid">
      <div className="row">
        {/*  Side navigation on large screen */}
        <AuthTopNavigation
          name={props.userName}
          title="Add an admin"
          isAdmin={props.isAdmin}
          isSuperAdmin={props.isSuperAdmin}
          dispatch={props.dispatch}
        />
        <div className="col-lg-10 offset-md-2 mt-lg-0">
          <Header text="Add an admin" />
          <div className="page-content">
            <div className="d-flex flex-column align-items-center mt-5">
              <LoadingIcon start={props.addingAdminStarted} size={3} />
              <div className="card align-items-center text-center w-75">
                <div className="card-body">
                  <BigAlert message={props.addingAdminError} />
                  {
                    props.addingAdminResolved ?
                      <BigAlert
                        message={`${props.newAdmin} is now an admin`}
                        type="success"
                      /> : null
                  }
                  <div className="input-group px-3">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </span>
                    <input
                      id="input-email"
                      type="text"
                      className="form-control"
                      placeholder="The user's email"
                      name="email"
                      onChange={props.getInput}
                    />
                  </div>
                  <SmallAlert message={props.inputErrors.emailError} />
                  <ul className="text-left mt-2">
                    <li>The user must have signed up already</li>
                    <li>If successful, the user would have access to:
                      <ol type="number">
                        <li>Creating a Center</li>
                        <li>Editing a Center</li>
                        <li>Viewing transactions</li>
                        <li>Making decisions on transactions</li>
                      </ol>
                    </li>
                  </ul>
                  <button
                    id="add-btn"
                    className="btn ie-blue-button"
                    disabled={props.addingAdminStarted}
                    onClick={props.add}
                  >Add Admin
                  </button>
                </div>
              </div>
            </div>
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
  newAdmin: '',
  addingAdminError: '',
  inputErrors: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  inputErrors: PropTypes.object,
  addingAdminStarted: PropTypes.bool.isRequired,
  addingAdminError: PropTypes.string,
  addingAdminResolved: PropTypes.bool.isRequired,
  newAdmin: PropTypes.string,
  getInput: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default View;
