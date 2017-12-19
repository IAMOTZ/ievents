import _ from 'lodash';

// This function is used to check the type of value
const type = (value) => {
  if (typeof (value) !== 'object') {
    return typeof (value);
  } else if (value === null) {
    return null;
  } else {
    let text = value.constructor.toString()
    let dataType = text.match(/function (.*)\(/)[1];
    return dataType.toLowerCase();
  }
};

export default (centers, id) => {
  if (type(centers) !== 'array') {
    throw new Error('Helper [getCenterById]: centers parameter has to be an array');
  } else if (type(id) !== 'string' && type(id) !== 'number') {
    throw new Error('Helper [ge tCenterById]: id parameter has to be a number');
  } else {
    return _.find(centers, { id: Number(id) });
  }
};
