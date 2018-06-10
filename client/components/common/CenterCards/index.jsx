import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { RenderCenterBody, RenderCenterBodyInTransactions } from './subComponents';

const defaultImage = '/images/defaultImgx4.jpeg';

const CenterCards = props => props.centers.map(center => (
  <div className="col-lg-4 col-md-6 col-sm-1" key={center.id}>
    <div className="card centerCard">
      <div>
        <img className="card-img-top" src={center.images ? center.images[0] : defaultImage} alt="The Center" />
        <div className="badge-container">
          <span className="badge text-white p-2 seat-badge ">{center.capacity} seats</span>
        </div>
      </div>
      {
        props.isTransactionsPage ?
          <RenderCenterBodyInTransactions center={center} {...props} /> :
          <RenderCenterBody center={center} {...props} />
      }
    </div>
  </div>
));
/* eslint-disable react/forbid-prop-types */
CenterCards.propTypes = {
  centers: PropTypes.array,
  createModalContent: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  onBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};
CenterCards.defaultProps = {
  centers: [],
  isAdmin: false,
  onEdit: () => { }
};

export default CenterCards;
