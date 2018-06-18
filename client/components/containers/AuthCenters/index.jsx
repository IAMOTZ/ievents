import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllCenters, setCenterToUpdate, setCenterToTransact,
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
    fetchingCenterStarted: store.fetchCentersReducer.fetchingCenterStarted,
    centers: store.fetchCentersReducer.centers,
    pagination: store.fetchCentersReducer.pagination,
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
    this.props.dispatch(getAllCenters({
      limit: this.props.pagination.limit,
      offset: this.props.pagination.offset,
    }));
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

  /**
   * It updates the store about a center whoose transactions is to be viewed.
   * @param {Event} event The event object.
   */
  onViewTransactions = (event) => {
    this.props.dispatch(setCenterToTransact(Number(event.currentTarget.id)));
  }

  /**
   * Compose the content to be displayed in the center details modal.
   * @param {Object} center The center object.
   */
  createModalContent = (center) => {
    const { images, name, details } = center;
    const state = { ...this.state };
    state.modalContent = {
      centerName: name,
      centerImages: images,
      centerDetails: details
    };
    this.setState(state);
  }
  /**
   * Updates the pagination for the centers.
   * @param {Object} pageData The current page data.
   */
  updatePagination = (pageData) => {
    const nextOffset = pageData.selected * this.props.pagination.limit;
    this.props.dispatch(getAllCenters({
      limit: this.props.pagination.limit,
      offset: nextOffset
    }));
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        centers={this.props.centers}
        fetchingCenterStarted={this.props.fetchingCenterStarted}
        onEdit={this.onEdit}
        onBook={this.onBook}
        onViewTransactions={this.onViewTransactions}
        createModalContent={this.createModalContent}
        modalContent={this.state.modalContent}
        pagination={this.props.pagination}
        updatePagination={this.updatePagination}
        isTransactionsPage={this.props.isTransactionsPage}
      />
    );
  }
}

AuthCenters.defaultProps = {
  userName: '',
  isAdmin: false,
  isSuperAdmin: false,
  isTransactionsPage: false,
  fetchingCenterStarted: false,
  centers: [],
  dispatch: () => {},
  pagination: {},
};

/* eslint-disable react/forbid-prop-types */
AuthCenters.propTypes = {
  userName: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  isTransactionsPage: PropTypes.bool,
  fetchingCenterStarted: PropTypes.bool,
  centers: PropTypes.array,
  dispatch: PropTypes.func,
  pagination: PropTypes.object,
};

export default AuthCenters;
