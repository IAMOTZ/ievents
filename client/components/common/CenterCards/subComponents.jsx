import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const RenderCenterBody = (props) => {
  const { center } = props;
  return (
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
            <a
              className="no-outline-btn"
              onClick={() => props.createModalContent(center)}
              data-toggle="modal"
              href="#center-details-modal"
              role="button"
            >About center
            </a>
          </div>
        </div>
      </div>
      {
        props.isAdmin ?
          <div className="admin-only-icons">
            <i className="fa fa-pencil fa-fw" aria-hidden="true" />&nbsp;
            <Link
              to={`/centers/${center.id}/edit`}
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
  );
};
/* eslint-disable react/forbid-prop-types */
RenderCenterBody.propTypes = {
  center: PropTypes.object.isRequired,
  createModalContent: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  onBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};
RenderCenterBody.defaultProps = {
  onEdit: () => { },
  isAdmin: false,
};

export const RenderCenterBodyInTransactions = props => (
  <div className="card-body d-flex flex-column">
    <div>
      <h4 className="card-title text-capitalize">{props.center.name}</h4>
      <div>
        <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
        <span className="text-capitalize">{props.center.location}</span>
      </div>
    </div>
    <Link
      onClick={props.onViewTransactions}
      to={`/transaction/${props.center.id}/events`}
      id={props.center.id}
      className="btn ie-blue-button mt-2 btn-block"
    >View Transactions
    </Link>
  </div>
);
RenderCenterBodyInTransactions.propTypes = {
  center: PropTypes.object.isRequired,
  onViewTransactions: PropTypes.func.isRequired,
};

