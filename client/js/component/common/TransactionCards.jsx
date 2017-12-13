import React from 'react';


const TransactionCards = (props) => {
  return (
    <div id="transactions" class="mt-lg-0">
      <div id="accordion" role="tablist">
        {
          props.centers.map((center, index) => {
            return (
              <div class="card w-lg-75 my-3 bg-white" key={index}>
                <a href={`#collapse${index}`} data-toggle="collapse" class="text-dark">
                  <div class="card-header" role="tab">
                    <h5 class="mb-0">
                      {center.name}
                    </h5>
                  </div>
                </a>
                <div id={`collapse${index}`} class="collapse" role="tabpanel" data-parent="#accordion">
                  <div class="card-body">
                    <TransactionTable transactions={center.transactions} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
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
              <td>{transaction.event.user.email}</td>
              <td>{transaction.event.date}</td>
              <td>
                <button class="btn btn-outline-dark p-1 mb-1 mb-sm-0 mr-2">Allow</button>
                <button class="btn btn-outline-danger p-1">Cancel</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default TransactionCards;
