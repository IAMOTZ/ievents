/**
 * Format the event data to be returned to the user.
 * @param {Object} eventData The raw event data gotten from the database.
 * @returns {Object} The formatted event data.
 */
export const formatEventData = eventData => (
  Object.assign(
    {},
    {
      id: eventData.id,
      centerId: eventData.centerId,
      userId: eventData.userId,
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      status: eventData.status,
    },
  )
);

/**
 * Get a single center from the database.
 * @param {Object} centerModel The query interface for centers in the database.
 * @param {String} centerId The ID of the center.
 * @returns {Object} The center gotten from the database.
 */
export const getCenter = async (centerModel, centerId) => {
  const center = await centerModel.findById(Number(centerId));
  return center;
};

/**
 * Checks if a center is booked(has event) on a particular date.
 * @param {Object} eventModel The query interface for events in the database.
 * @param {Number} centerId The ID of the center.
 * @param {String} date The date to be compared.
 * @returns {Boolean} Truthy values representing if the center is booked or not.
 */
export const isCenterBooked = async (eventModel, centerId, date) => {
  const event =
    await eventModel.findOne({
      where: {
        date,
        centerId,
        status: 'allowed',
      },
    });
  return !!event;
};

/**
 * Creates the email body to send to the user whoose event is to be canceled.
 * @param {String} eventTitle The title of the event.
 * @param {String} eventDate The date the event is supposed to occur.
 * @returns {String} The email constructed.
 */
export const createEmailBody = (eventTitle, eventDate) => (
  `<h3>iEvents</h3>
  <p>Your event, <b>${eventTitle}</b> ,that is supposed to come up on <b>
    ${eventDate}</b> has been canceled!!
    <br> Consequently, the center would not be available for your event.
    <br> <br>
    <b>NOTE:</b>This email terminates the transaction we created with you on this event.
    <br> <br> We are very sorry for any inconvinience that this might have caused you.
    <br> For more details, you can always contact us at admin@ievents.com.
  </p>`
);
