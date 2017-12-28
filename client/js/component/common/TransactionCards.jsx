import React from 'react';

class TransactionCards extends React.Component {
  constructor() {
    super();
    this.state = {
      eventModalDetails: null,
    }
  }

  showEventModal = (e) => {
    this.setState({
      eventModalDetails: {
        title: e.target.dataset.eventTitle,
        description: e.target.dataset.eventDescription,
      }
    });
  }

  render() {
    return (
      <div>
        <div id="accordion" role="tablist">
          {
            this.props.centers.map((center, index) => {
              return (
                <div class="card w-lg-75 my-3 bg-white" key={index}>
                  <a href={`#collapse${index}`} data-toggle="collapse" class="text-dark">
                    <div class="card-header" role="tab">
                      <h5 class="mb-0">
                        {`${center.name}(${center.transactions.length})`}
                      </h5>
                    </div>
                  </a>
                  <div id={`collapse${index}`} class="collapse" role="tabpanel" data-parent="#accordion">
                    <div class="card-body">
                      <TransactionTable
                        transactions={center.transactions}
                        btnAction={this.showEventModal}
                        onCancel={this.props.onCancel} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <EventModal event={this.state.eventModalDetails} />
      </div>
    )
  }
}

const TransactionTable = (props) => {
  return (
    <table class="table table-striped table-responsive-md">
      <thead>
        <tr>
          <th scope="col" class="d-none d-lg-table-cell">#</th>
          <th scope="col">Client Email</th>
          <th scope="col">Date</th>
          <th scope="col">Decision</th>
        </tr>
      </thead>
      <tbody>
        {
          props.transactions.map((transaction, index) => (
            <tr key={index}>
              <th scope="row" class="d-none d-lg-table-cell">{index + 1}</th>
              <td>{transaction.event.user.email}
                <a href=""
                  class="d-block d-lg-inline ml-lg-2"
                  data-toggle="modal"
                  data-target="#eventModal"
                  data-event-title={transaction.event.title}
                  data-event-description={transaction.event.description}
                  onClick={props.btnAction}>event details</a>
              </td>
              <td>{transaction.event.date}</td>
              <td>
                <button
                  class="btn btn-outline-danger p-1"
                  onClick={props.onCancel}
                  data-transaction-id={transaction.id}>Cancel</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

const EventModal = (props) => {
  if (!props.event) {
    return null;
  } else {
    return (
      <div class="modal fade" id="eventModal" tabIndex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <span class="modal-title" id="exampleModalLabel">
                <span className="h5">Title:&nbsp;</span> <br />
                <span>{props.event.title}</span>
              </span>
            </div>
            <div class="modal-body">
              <span className="h5">Description:&nbsp;</span> <br />
              <span>{props.event.description}</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionCards;
