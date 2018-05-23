import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './styles.scss';
import BookingTable from './BookingTable';

const defaultImage = '/images/defaultImgx4.jpeg';

const checkForBooking = (dates) => {
  let component;
  if (dates && dates.length !== 0) {
    component = {
      element:
        (
          <a
            href=".multi-collapse"
            className="font-italic small"
            data-toggle="collapse"
          >This center has been booked on...
          </a>
        ),
      displayTable: true,
    };
  } else {
    component = {
      element: (
        <p className="text-muted small mb-0">
          This center has not being booked at all, why don&apos;t you be the first.
        </p>
      ),
      displayTable: false,
    };
  }
  return component;
};

class CenterModal extends React.Component {
  constructor() {
    super();
    this.state = { redirect: false };
  }

  /**
   * It updates the state to allow redirecting.
   * @param {Event} event The event object.
   */
  redirect = (event) => {
    this.setState({ redirect: true });
    if (this.props.onBook) {
      this.props.onBook(Number(event.target.id));
    }
  }

  render() {
    let component;
    if (this.state.redirect) {
      component = (<Redirect to={this.props.redirectPath} />);
    } else {
      component = (
        <div
          className="modal fade"
          id="center-details-modal"
          tabIndex="-1"
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className=" collapse show multi-collapse">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={
                      this.props.modalContent.images ?
                        this.props.modalContent.images[0] : defaultImage
                    }
                    alt="The center"
                  />
                  <span className="badge text-white p-2 seat-badge">
                    {this.props.modalContent.capacity} seat
                  </span>
                  <div className="card-body d-flex flex-column">
                    <div>
                      <h4 className="card-title d-inline">
                        {this.props.modalContent.name}
                      </h4>
                      <button className="close text-primary" data-dismiss="modal">
                        <i className="fa fa-remove fa-fw" />
                      </button>
                      <br />
                      <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
                      <span>{this.props.modalContent.location}</span>
                    </div>
                    <p>{this.props.modalContent.details}</p>
                    {checkForBooking(this.props.modalContent.bookedOn).element}
                    <button
                      className="btn ie-blue-button mt-2 btn-block"
                      onClick={this.redirect}
                      id={this.props.modalContent.id}
                      data-dismiss="modal"
                    > Book now for ₦{this.props.modalContent.price}/Day
                    </button>
                  </div>
                </div>
              </div>
              {/* Booking dates */}
              <div className="collapse multi-collapse ">
                <div className="card">
                  <div className="card-header clear-fix bg-white">
                    <a href=".multi-collapse" className="float-right" data-toggle="collapse">
                      <i className="fa fa-remove" />
                    </a>
                    <h4 className="card-title">{this.props.modalContent.name}</h4>
                    <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
                    <span className="text-capitalize">{this.props.modalContent.location}</span>
                    <p className="text-muted small mb-0">This center has already been booked on the following dates</p>
                  </div>
                  <BookingTable
                    tableContent={this.props.modalContent}
                    display={checkForBooking(this.props.modalContent.bookedOn).displayTable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return component;
  }
}

CenterModal.defaultProps = {
  redirectPath: null,
  onBook: null,
  modalContent: null,
};
/* eslint-disable react/forbid-prop-types */
CenterModal.propTypes = {
  redirectPath: PropTypes.string,
  onBook: PropTypes.func,
  modalContent: PropTypes.object,
};

export default CenterModal;
