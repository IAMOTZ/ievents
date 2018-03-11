import { find } from 'lodash';

/**
 * It converts a month number to its corresponding name.
 * @param {Number} monthNumber The month number.
 * @returns {Object} The month name
 */
const monthToString = (monthNumber) => {
  switch (monthNumber) {
    case 1: {
      return { monthName: 'January' };
    }
    case 2: {
      return { monthName: 'February' };
    }
    case 3: {
      return { monthName: 'March' };
    }
    case 4: {
      return { monthName: 'April' };
    }
    case 5: {
      return { monthName: 'May' };
    }
    case 6: {
      return { monthName: 'June' };
    }
    case 7: {
      return { monthName: 'July' };
    }
    case 8: {
      return { monthName: 'August' };
    }
    case 9: {
      return { monthName: 'September' };
    }
    case 10: {
      return { monthName: 'October' };
    }
    case 11: {
      return { monthName: 'November' };
    }
    case 12: {
      return { monthName: 'December' };
    }
    default: {
      return {};
    }
  }
};


/**
 * It get just one center from an array of centers using its ID.
 * @param {Array} centers The array of centers.
 * @param {Number} id The ID of the center to find
 * @returns {Object} The ceneter that was found.
 */
const getCenterById = (centers, id) => find(centers, { id: Number(id) });


/**
* It counts all the elements of a collection that fufils a condition.
* @param {Array} collection The collection array to count from.
* @param {Funtion} condition Determines what element of the collection to be counted.
* @returns {Number} The result of the counting.
*/
const countCollection = (collection, condition) => collection.filter(condition).length;

export { monthToString, countCollection, getCenterById };
