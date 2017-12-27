import sequelize from 'sequelize';

const Op = sequelize.Op;

const updateEventStatus = (eventModel) => {
  // I shoud utilize the time zone stuff
  const currentDate = new Date();
  return new Promise((resolve, reject) => {
    eventModel
      .all({
        attributes: ['id', 'date'],
        where: {
          status: {
            [Op.ne]: 'done',
          }
        }
      })
      .then((eventData) => {
        const toUpdate = [];
        eventData.map((event) => {
          if (compareDate(currentDate, new Date(event.date), 24 * 60 * 60 * 1000)) {
            toUpdate.push(event.id);
          }
        });
        return toUpdate;
      })
      .then((eventdIds) => {
        resolve(eventModel
          .update({ status: 'done' }, {
            where: {
              id: {
                [Op.in]: eventdIds
              }
            }
          })
        );
      });
  });
}

// Add the extra time to the comparison
const compareDate = (date1, date2, offset) => {
  if (date1.getTime() > date2.getTime() + offset) {
    return true;
  } else {
    return false;
  }
}

export default updateEventStatus;