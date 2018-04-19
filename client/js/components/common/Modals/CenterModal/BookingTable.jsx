import React from 'react';
import { monthToString } from '../../../../helpers/helpers';

const BookingTable = (props) => {
  let component;
  if (!props.display) {
    component = null;
  } else {
    component = (
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
            props.tableContent.bookedOn.map((date) => {
              const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
              return (
                <tr key={new Date(date).getTime()}>
                  <td>{dateData[1]}</td>
                  <td>{monthToString(Number(dateData[2])).monthName}</td>
                  <td>{dateData[3]}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
  return component;
};

export default BookingTable;
