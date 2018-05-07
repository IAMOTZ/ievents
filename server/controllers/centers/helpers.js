/**
 * Get a single center from the database.
 * @param {Object} centerModel The query interface for centers in the database.
 * @param {Number} centerId The ID of the center.
 * @param {Object} options Query opitons.
 * @returns {Object} The center gotten from the database.
 */
export const getCenter = async (centerModel, centerId, options) => {
  const center = await centerModel.findById(Number(centerId), options);
  return center;
};

/**
 * Map out the dates of allowed events.
 * @param {Array} eventsArray an array of events.
 * @returns {Array} an array of the date of allowed events.
 */
const getDatesFromAllowedEvents = eventsArray => (
  eventsArray.filter(event => event.status === 'allowed').map(event => event.date)
);


/**
 * Format the center data to be returned to the user.
 * @param {Object} centerData The raw center data gotten from the database.
 * @returns {Object} The formatted center data.
 */
export const formatCenterData = centerData => (
  Object.assign(
    {},
    {
      id: centerData.id,
      name: centerData.name,
      location: centerData.location,
      details: centerData.details,
      capacity: centerData.capacity,
      price: centerData.price,
      images: centerData.images,
      bookedOn: centerData.events ? getDatesFromAllowedEvents(centerData.events) : null,
    },
  )
);
