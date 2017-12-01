 import React from 'react';

 export default (props) => {
  const centerOptions = props.centers.map((center) => {
    return (<option value={center.id} key={center.id} name="centerId">{center.name}</option>)
  });
  return centerOptions;
 }