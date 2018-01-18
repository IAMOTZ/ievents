import _ from 'lodash';

/**
 * It get just one center from an array of centers using its ID.
 * @param {Array} centers The array of centers.
 * @param {Number} id The ID of the center to find
 * @returns {Object} The ceneter that was found.
 */
const getCenterById = (centers, id) => _.find(centers, { id: Number(id) });

export default getCenterById;
