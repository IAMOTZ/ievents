import React from 'react';

export default (props) => {
  const centerOptions = props.centers.map((center) => {
    if (center.id === props.selected) {
      return (<option value={center.id} key={center.id} name="centerId" selected>{center.name}</option>)
    } else {
      return (<option value={center.id} key={center.id} name="centerId">{center.name}</option>)
    }
  });
  return centerOptions;
}