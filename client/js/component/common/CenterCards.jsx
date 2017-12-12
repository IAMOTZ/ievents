import React from 'react';
import { Link } from 'react-router-dom';

const defaultImage = '../../../images/defaultImgx4.jpeg';

const CenterCards = (props) => {
  return props.centers.map((center) => (
    <div className="col-lg-4 col-md-6 col-sm-12" key={center.id}>
      <div className="card">
        <div>
          <img className="card-img-top" src={center.images ? center.images[0] : defaultImage} alt="" />
          <span className="badge text-white p-2 seat-badge ">{center.capacity} seats</span>
        </div>
        <div className="card-body d-flex flex-column">
          <div>
            <h4 className="card-title text-capitalize">{center.name}</h4>
            <i className="fa fa-map-marker fa-fw" aria-hidden="true"></i>&nbsp; <span className="text-capitalize">{center.location}</span>
          </div>
          <ActionBtn isAdmin={props.isAdmin || false}
            id={center.id}
            editAction={props.editAction}
            btnAction={props.btnAction} />
        </div>
      </div>
    </div>
  ));
}

const ActionBtn = (props) => {
  if (props.isAdmin) {
    return (
      <Link to="/editCenter"
        class="btn text-white mt-3"
        id={props.id}
        onClick={props.editAction}>Edit</Link>
    );
  } else {
    return (
      <a role="button"
        class="btn text-white mt-3"
        data-toggle="modal"
        data-target="#center-details-modal"
        id={props.id}
        onClick={props.btnAction}>Details</a>
    );
  }
}

export default CenterCards;
