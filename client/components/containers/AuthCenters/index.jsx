import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  /**
   * It updates the store about a center that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(setCenterToUpdate(Number(event.target.id)));
  }

  /**
   * It updates the store about a center that is to be booked.
   * @param {Event} event The event object.
   */
  onBook = (event) => {
    this.props.dispatch(setCenterToBook(Number(event.target.id)));
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
        onEdit={this.onEdit}
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
