import React from 'react';
import PropTypes from 'prop-types';
import { RegularTopNavigation } from '../../common/TopNavigation';
import Footer from '../../common/Footer';
import CenterCards from '../../common/CenterCards';
import { CenterModal } from '../../common/Modals';
import { LoadingBox } from '../../common/LoadingAnimation';

const View = props => (
  <div id="regular-centers-container">
    <RegularTopNavigation />
    {
      props.centers.length === 0 && props.fetchingCenterStarted ?
        <LoadingBox iconSize={4} /> :
        <div className="page-content mb-5">
          <div className="container">
            <h1 className="display-4">A special center for a special event</h1>
            {/* Centers Grid */}
            <div className="mt-5">
              <div className="row">
                <CenterCards centers={props.centers} btnAction={props.showModal} />
              </div>
            </div>
          </div>
        </div>
    }
    {/* Modal */}
    {
      props.modalContent ? <CenterModal
        modalContent={props.modalContent}
        onBook={props.onBook}
        redirectPath="/users/login"
      /> : null
    }
    <Footer />
  </div>
);

View.defaultProps = {
  modalContent: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  centers: PropTypes.array.isRequired,
  onBook: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  fetchingCenterStarted: PropTypes.bool.isRequired,
};

export default View;

