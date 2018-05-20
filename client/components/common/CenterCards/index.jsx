import React from 'react';
import ActionButton from './ActionButton';

const defaultImage = '/images/defaultImgx4.jpeg';

const CenterCards = props => props.centers.map(center => (
  <div className="col-lg-4 col-md-6 col-sm-12" key={center.id}>
    <div className="card">
      <div>
        <img className="card-img-top" src={center.images ? center.images[0] : defaultImage} alt="" />
        <span className="badge text-white p-2 seat-badge ">{center.capacity} seats</span>
      </div>
      <div className="card-body d-flex flex-column">
        <div>
          <h4 className="card-title text-capitalize">{center.name}</h4>
          <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
          <span className="text-capitalize">{center.location}</span>
        </div>
        <ActionButton
          isAdmin={props.isAdmin || false}
          id={center.id}
          startEditingCenter={props.editAction}
          showCenterDetails={props.btnAction}
        />
      </div>
    </div>
  </div>
));

export default CenterCards;
