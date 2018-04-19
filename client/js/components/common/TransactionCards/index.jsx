import React from 'react';
import PropTypes from 'prop-types';
import EventDetailsModal from './EventDetailsModal';
import TransactionTable from './TransacitonTable';

class TransactionCards extends React.Component {
  constructor() {
    super();
    this.state = {
      eventModalDetails: null,
    };
  }

  /**
   * It updates the state with the information to be shown on the modal.
   *
   * @param {Event} event The event object.
   */
  showEventModal = (event) => {
    this.setState({
      eventModalDetails: {
        title: event.target.dataset.eventTitle,
        description: event.target.dataset.eventDescription,
      },
    });
  }

  render() {
    return (
      <div>
        <div id="accordion" role="tablist">
          {
            this.props.centers.map((center, index) => (
              <div className="card w-lg-75 my-3 bg-white" key={center.id}>
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
                      onCancelEvent={this.props.startDelete}
                      toDelete={this.props.toDelete}
                      deleting={this.props.deleting}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <EventDetailsModal event={this.state.eventModalDetails} />
      </div>
    );
  }
}

TransactionCards.defaultProps = {
  toDelete: null,
  deleting: false,
};
/* eslint-disable react/forbid-prop-types */
TransactionCards.propTypes = {
  centers: PropTypes.array.isRequired,
  startDelete: PropTypes.func.isRequired,
  toDelete: PropTypes.number,
  deleting: PropTypes.bool,
};

export default TransactionCards;
