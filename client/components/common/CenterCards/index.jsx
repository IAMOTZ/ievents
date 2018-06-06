import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

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
      <div className="card-body d-flex flex-column">
        <div>
          <h4 className="card-title text-capitalize">{center.name}</h4>
          <div className="icons">
            <div>
              <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
              <span className="text-capitalize">{center.location}</span>
            </div>
            <div>
              <i className="fa fa-info-circle fa-fw" aria-hidden="true" />&nbsp;
              <a data-toggle="collapse" href={`#center-details-collapse-${center.id}`} role="button">About center</a>
            </div>
          </div>
          <div className="collapse" id={`center-details-collapse-${center.id}`}>
            <br />
            <span className="center-details">{center.details}</span>
          </div>
        </div>
        {
          props.isAdmin ?
            <div className="admin-only-icons">
              <i className="fa fa-pencil fa-fw" aria-hidden="true" />&nbsp;
              <Link
                to="/editCenter"
                id={center.id}
                onClick={props.onEdit}
              >Edit Center
              </Link>
            </div> : null
        }
        <Link
          to="/addEvent"
          onClick={props.onBook}
          id={center.id}
          className="btn ie-blue-button mt-2 btn-block"
        > Book now for ₦{center.price}/Day
        </Link>
      </div>
    </div>
  </div>
));

/* eslint-disable react/forbid-prop-types */
CenterCards.propTypes = {
  centers: PropTypes.array.isRequired,
  onBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

export default CenterCards;
