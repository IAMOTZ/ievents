import React from 'react';
import PropTypes from 'prop-types';
import { RegularTopNavigation } from '../../common/TopNavigation';
import Footer from '../../common/Footer';
import CenterCards from '../../common/CenterCards';
import { LoadingBox } from '../../common/LoadingAnimation';
import { CenterDetailsModal } from '../../common/Modals';
import Pagination from '../../common/Pagination';

const View = props => (
  <div id="regular-centers-container">
    <RegularTopNavigation />
    {
      props.centers.length === 0 && props.fetchingCenterStarted ?
        <LoadingBox iconSize={4} /> :
        <div className="page-content mb-5">
          <div className="container">
            <h1 className="caption-text">A special center for a special event</h1>
            {/* Centers Grid */}
            <div className="row">
              <CenterCards
                centers={props.centers}
                onBook={props.onBook}
                createModalContent={props.createModalContent}
              />
            </div>
          </div>
          <Pagination
            pageCount={Math.ceil(props.pagination.totalCount / props.pagination.limit)}
            onPageChange={props.updatePagination}
          />
          <CenterDetailsModal {...props.modalContent} />
        </div>
    }
    <Footer />
  </div>
);

View.defaultProps = {
  modalContent: {}
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  centers: PropTypes.array.isRequired,
  onBook: PropTypes.func.isRequired,
  fetchingCenterStarted: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  updatePagination: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  createModalContent: PropTypes.func.isRequired
};

export default View;
