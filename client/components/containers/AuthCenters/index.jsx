import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find } from 'lodash';
import {
  getAllCenters, setCenterToUpdate,
} from '../../../actions/centerActions';
import { setCenterToBook } from '../../../actions/eventActions';
import './styles.scss';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    fetchingCentersStarted: store.fetchCentersReducer.fetchingCenterStarted,
    centers: store.fetchCentersReducer.centers,
  };
})
class AuthCenters extends React.Component {
  constructor() {
    super();
    this.state = {
      modalContent: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  /**
   * It updates the store about a center that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(setCenterToUpdate(event.target.id));
  }

  /**
   * It updates the store about a center that is to be booked.
   * @param {Number} centerId The ID of the center.
   */
  onBook = (centerId) => {
    this.props.dispatch(setCenterToBook(centerId));
  }

  /**
   * Displays the center modal.
   * It uses the center ID to get the details of the center to show.
   * @param {Event} event The event object.
   */
  showModal = (event) => {
    const state = { ...this.state };
    const centerId = Number(event.target.id);
    state.modalContent = find(this.props.centers, { id: centerId });
    this.setState(state);
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        centers={this.props.centers}
        fetchingCentersStarted={this.props.fetchingCentersStarted}
        showModal={this.showModal}
        onEdit={this.onEdit}
        modalContent={this.state.modalContent}
        onBook={this.onBook}
      />
    );
  }
}

AuthCenters.defaultProps = {
  userName: '',
  isAdmin: false,
  isSuperAdmin: false,
  fetchingCentersStarted: false,
  centers: [],
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
AuthCenters.propTypes = {
  userName: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  fetchingCentersStarted: PropTypes.bool,
  centers: PropTypes.array,
  dispatch: PropTypes.func,
};

export default AuthCenters;
