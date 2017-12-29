import React from 'react';
import { Redirect } from 'react-router-dom';
import MonthToString from '../../../helpers/Date';

const defaultImage = '/images/defaultImgx4.jpeg';

const BookingTable = (props) => {
  if (!props.display) {
    return null;
  } else {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Month</th>
            <th scope="col">Day</th>
          </tr>
        </thead>
        <tbody>
          {
            props.tableContent.bookedOn.map((date, index) => {
              const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
              return (
                <tr key={index}>
                  <td scope="row">{dateData[1]}</td>
                  <td>{MonthToString(Number(dateData[2])).monthName}</td>
                  <td>{dateData[3]}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }

};

const checkForBooking = (dates) => {
  if (dates && dates.length !== 0) {
    return {
      element: (<a href=".multi-collapse"
        className="font-italic small"
        data-toggle="collapse">
        This center has been booked on...</a>
      ),
      displayTable: true,
    }
  } else {
    return {
      element: (<p className="text-muted small mb-0">
        This center has not being booked at all, why don't you be the first.</p>),
      displayTable: false,
    }
  }
};

class CenterModal extends React.Component {
  constructor() {
    super();
    this.state = { redirect: false }
  }

  redirect = (e) => {
    this.setState({ redirect: true });
    this.props.onBook(Number(e.target.id));
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.props.redirectPath} />);
    } else {
      return (
        <div className="modal fade" id="center-details-modal" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className=" collapse show multi-collapse">
                <div className="card">
                  <img className="card-img-top"
                    src={this.props.modalContent.images ? this.props.modalContent.images[0] : defaultImage} alt="The center image" />
                  <span className="badge text-white p-2 seat-badge">{this.props.modalContent.capacity} seat</span>
                  <div className="card-body d-flex flex-column">
                    <div>
                      <h4 className="card-title d-inline">{this.props.modalContent.name}</h4>
                      <a href="" className="close text-primary" data-dismiss="modal" aria-label="Close">
                        <i className="fa fa-remove fa-fw"></i>
                      </a>
                      <br />
                      <i className="fa fa-map-marker fa-fw" aria-hidden="true"></i>&nbsp; <span>{this.props.modalContent.location}</span>
                    </div>
                    <p>{this.props.modalContent.details}</p>
                    {checkForBooking(this.props.modalContent.bookedOn).element}
                    <a className="btn text-white mt-2 btn-block"
                      onClick={this.redirect}
                      id={this.props.modalContent.id}
                      data-dismiss="modal"> Book now for ₦{this.props.modalContent.price}/Day</a>
                  </div>
                </div>
              </div>
              {/* Booking dates */}
              <div className="collapse multi-collapse ">
                <div className="card">
                  <div className="card-header clear-fix bg-white">
                    <a href=".multi-collapse" className="float-right" data-toggle="collapse">
                      <i className="fa fa-remove"></i>
                    </a>
                    <h4 className="card-title">{this.props.modalContent.name}</h4>
                    <i className="fa fa-map-marker fa-fw" aria-hidden="true"></i>&nbsp; <span className="text-capitalize">{this.props.modalContent.location}</span>
                    <p className="text-muted small mb-0">This center has already been booked on the following dates</p>
                  </div>
                  <BookingTable tableContent={this.props.modalContent} display={checkForBooking(this.props.modalContent.bookedOn).displayTable} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CenterModal;
