/**
 * It counts all the elements of a collection that fufils a condition.
 * @param {Array} collection The collection array to count from.
 * @param {Funtion} condition Determines what element of the collection to be counted.
 * @returns {Number} The result of the counting.
 */
const countCollection = (collection, condition) => collection.filter(condition).length;

export default countCollection;
