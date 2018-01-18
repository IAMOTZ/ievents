import React from 'react';

const DropDown = props => props.centers.map(center => (
  <option
    value={center.id}
    key={center.id}
    name="centerId"
  >{center.name}
  </option>));

export default DropDown;
