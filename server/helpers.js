import sequelize from 'sequelize';
import dotEnv from 'dotenv';

dotEnv.config();

const Op = sequelize.Op;

export const updateEventStatus = (eventModel, transactionModel) => {
  const currentDate = getCurrentDate(1); // Get the current time in Nigeria;
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
        eventModel
          .update({ status: 'done' }, {
            where: {
              id: {
                [Op.in]: eventdIds
              }
            }
          })
          .then(() => {
            transactionModel
              .destroy({
                where: {
                  eventId: {
                    [Op.in]: eventdIds
                  }
                }
              })
              .then(() => {
                resolve('done');
              });
          });
      });
  });
}

export const createSuperAdmin = (userModel) => {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        where: {
          email: process.env.SUPER_ADMIN_EMAIL
        }
      })
      .then((user) => {
        if (user) {
          resolve(null);
        } else {
          resolve(
            userModel
              .create({
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL,
                password: process.env.SUPER_ADMIN_PASSWORD,
                role: 'superAdmin',
              })
          );
        }
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

// Get the current time in a particular timezone.
export const getCurrentDate = (timeZoneOffset) => {
  const localDate = new Date();
  const UTCTime = new Date(
    localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(),
    localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds(),
    localDate.getUTCMilliseconds()
  ).getTime();
  return new Date(UTCTime + (timeZoneOffset * 60 * 60 * 1000));
}
