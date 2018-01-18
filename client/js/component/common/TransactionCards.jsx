import React from 'react';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';

class TransactionCards extends React.Component {
  constructor() {
    super();
    this.state = {
      eventModalDetails: null,
    };
  }

  /**
   * It updates the state with the information to be shown on the modal.
   * @param {Event} e The event object.
   */
  showEventModal = (e) => {
    this.setState({
      eventModalDetails: {
        title: e.target.dataset.eventTitle,
        description: e.target.dataset.eventDescription,
      },
    });
  }

  render() {
    return (
      <div>
        <div id="accordion" role="tablist">
          {
            this.props.centers.map((center, index) => {
              return (
                <div className="card w-lg-75 my-3 bg-white" key={index}>
                  <a
                    href={`#collapse${index}`}
                    data-toggle="collapse"
                    className="text-dark"
                  >
                    <div className="card-header" role="tab">
                      <h5 className="mb-0">
                        {`${center.name}(${center.transactions.length})`}
                      </h5>
                    </div>
                  </a>
                  <div
                    id={`collapse${index}`}
                    className="collapse"
                    role="tabpanel"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <TransactionTable
                        transactions={center.transactions}
                        btnAction={this.showEventModal}
                        onCancel={this.props.onCancel}
                        toDelete={this.props.toDelete}
                        deleting={this.props.deleting} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <EventModal event={this.state.eventModalDetails} />
      </div>
    );
  }
}

const TransactionTable = props => (
  <table className="table table-striped table-responsive-md">
    <thead>
      <tr>
        <th scope="col" className="d-none d-lg-table-cell">#</th>
        <th scope="col">Client Email</th>
        <th scope="col">Date</th>
        <th scope="col">Decision</th>
      </tr>
    </thead>
    <tbody>
      {
        props.transactions.map((transaction, index) => (
          <tr key={index}>
            <th scope="row" className="d-none d-lg-table-cell">{index + 1}</th>
            <td>{transaction.event.user.email}
              <a href=""
                className="d-block d-lg-inline ml-lg-2"
                data-toggle="modal"
                data-target="#eventModal"
                data-event-title={transaction.event.title}
                data-event-description={transaction.event.description}
                onClick={props.btnAction}
              >event details
              </a>
            </td>
            <td>{transaction.event.date}</td>
            <td>
              <div className="d-flex">
                <button
                  className="btn btn-outline-danger p-1"
                  onClick={props.onCancel}
                  data-transaction-id={transaction.id}
                  disabled={props.deleting}
                >Cancel
                </button>
                <LoadingIcon
                  start={props.deleting && transaction.id === Number(props.toDelete)}
                  size={1}
                />
              </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);


const EventModal = (props) => {
  let component;
  if (!props.event) {
    component = null;
  } else {
    component = (
      <div
        className="modal fade"
        id="eventModal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                <span className="h5">Title:&nbsp;</span> <br />
                <span>{props.event.title}</span>
              </span>
            </div>
            <div className="modal-body">
              <span className="h5">Description:&nbsp;</span> <br />
              <span>{props.event.description}</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return component;
};

export default TransactionCards;
