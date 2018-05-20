import React from 'react';
import PropTypes from 'prop-types';

const CenterDropDown = props => (
  <select
    id="centers"
    className="form-control ml-md-3"
    name="centerId"
    onChange={props.handleChange}
    defaultValue={props.defaultValue}
  >
    <option value="" name="centerId">choose a center</option>
    {
      props.centers.map(center => (
        <option
          value={center.id}
          key={center.id}
          name="centerId"
        >{center.name}
        </option>))
    }
  </select>
);

CenterDropDown.defaultProps = {
  defaultValue: 0,
  centers: [],
};

/* eslint-disable react/forbid-prop-types */
CenterDropDown.propTypes = {
  centers: PropTypes.array,
  defaultValue: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

export default CenterDropDown;
