import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCenters } from '../../../actions/centerActions';
import { setCenterToBook } from '../../../actions/eventActions';
import './styles.scss';
import View from './View';

@connect(store => (
  {
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
    fetchingCenterStarted: store.fetchCentersReducer.fetchingCenterStarted,
    centers: store.fetchCentersReducer.centers,
    pagination: store.fetchCentersReducer.pagination,
  }
))
class RegularCenters extends React.Component {
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
   * It updates the store about a center that is to be booked.
   * @param {Number} centerId The ID of the center.
   */
  onBook = (centerId) => {
    this.props.dispatch(setCenterToBook(centerId));
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

  updatePagination = (pageData) => {
    const nextOffset = pageData.selected * this.props.pagination.limit;
    this.props.dispatch(getAllCenters({
      limit: this.props.pagination.limit,
      offset: nextOffset
    }));
  }

  render() {
    if (this.props.isUserAuthenticaed) {
      return <Redirect to="/centers" />;
    }
    return (
      <View
        centers={this.props.centers}
        onBook={this.onBook}
        fetchingCenterStarted={this.props.fetchingCenterStarted}
        pagination={this.props.pagination}
        updatePagination={this.updatePagination}
        createModalContent={this.createModalContent}
        modalContent={this.state.modalContent}
      />
    );
  }
}

RegularCenters.defaultProps = {
  isUserAuthenticaed: false,
  fetchingCenterStarted: false,
  centers: [],
  dispatch: () => {},
  pagination: {}
};

/* eslint-disable react/forbid-prop-types */
RegularCenters.propTypes = {
  isUserAuthenticaed: PropTypes.bool,
  fetchingCenterStarted: PropTypes.bool,
  centers: PropTypes.array,
  dispatch: PropTypes.func,
  pagination: PropTypes.object,
};

export default RegularCenters;
