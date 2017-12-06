import React from 'react';

const defaultImage = '../../../images/defaultImgx4.jpeg';

export default (props) => {
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
            <a role="button" class="btn text-white mt-3" data-toggle="modal" data-target="#center-details-modal">Details</a>
          </div>
        </div>
      </div>
    )); 
}


