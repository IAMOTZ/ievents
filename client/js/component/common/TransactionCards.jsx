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
      <div id="transactions" class="mt-lg-0">
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
                        onAllow={this.props.onAllow}
                        onCancel={this.props.onCancel}
                        onDelete={this.props.onDelete} />
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
              <ActionButtons
                decision={transaction.decision}
                transactionId={transaction.id}
                onAllow={props.onAllow}
                onCancel={props.onCancel}
                onDelete={props.onDelete} />
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
                <span className="h5">Title:&nbsp;</span> <br/>
                <span>{props.event.title}</span>
              </span>
            </div>
            <div class="modal-body">
              <span className="h5">Description:&nbsp;</span> <br/>
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

const ActionButtons = (props) => {
  if (!props.decision) {
    return (
      <td>
        <button
          class="btn btn-outline-dark p-1 mb-1 mb-sm-0 mr-2"
          onClick={props.onAllow}
          data-transaction-id={props.transactionId}>Allow</button>
        <button
          class="btn btn-outline-danger p-1"
          onClick={props.onCancel}
          data-transaction-id={props.transactionId}>Cancel</button>
      </td>
    )
  } else {
    return (
      <td>
        <span className="text-muted">{props.decision}</span>
        <span className="d-block d-lg-inline d-md-inline ml-lg-2 ml-md-2 text-center">
          <i
            className="fa fa-trash fw"
            data-transaction-id={props.transactionId}
            onClick={props.onDelete}></i>
        </span>

      </td>
    )
  }
}
export default TransactionCards;
