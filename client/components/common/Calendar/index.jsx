import React from 'react';
import PropTypes from 'prop-types';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

const Calendar = (props) => {
  const today = new Date();
  const tommorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  let minDate;
  // There must be 24hours between today and the minimum date that is selectable.
  if (tommorrow.getTime() - today.getTime() >= 24 * 60 * 60 * 1000) {
    minDate = tommorrow;
  } else {
    minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  }
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());
  const minMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <InfiniteCalendar
      width={400}
      height={300}
      selected={false}
      minDate={minDate}
      max={maxMonth}
      min={minMonth}
      onSelect={props.handleDateSelection}
      displayOptions={{
        showTodayHelper: false
      }}
      theme={{
        selectionColor: 'rgb(0, 142, 214)',
      }}
    />
  );
};

Calendar.propTypes = {
  handleDateSelection: PropTypes.func.isRequired
};

export default Calendar;
