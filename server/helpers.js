/* eslint-disable no-else-return */
import sequelize from 'sequelize';
import dotEnv from 'dotenv';
import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';

dotEnv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERCRET,
});


const { Op } = sequelize;

/**
 * Compares two date time to see which one is larger.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @param {Number} [offset=0] An optional amount of time to offset the second date.
 * @returns {Boolean} A truthy values representing if the first date is larger or not.
 */
const compareDate = (date1, date2, offset) => {
  if (date1.getTime() > date2.getTime() + offset) {
    return true;
  } else {
    return false;
  }
};

/**
 * Get the current date in a particular location in the world.
 * This function is needed to handle the differences between where the app would be hosted and
 * where the app would be actully in use.
 * @param {Number} timeZoneOffset The timezone offset of that particular location.
 * @returns {Date} The date in that location.
 */
export const getCurrentDate = (timeZoneOffset) => {
  const localDate = new Date();
  const UTCTime = new Date(
    localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(),
    localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds(),
    localDate.getUTCMilliseconds(),
  ).getTime();
  return new Date(UTCTime + (timeZoneOffset * 60 * 60 * 1000));
};

/**
 * Updates the status of all the event that their date is passed to become DONE.
 * It also deletes the transaction of such events.
 * @param {Object} eventModel The query interface for events in the database.
 * @param {Object} transactionModel The query interface for transactions in the database.
 */
export const updateEventStatus = async (eventModel, transactionModel) => {
  const currentDate = getCurrentDate(1); // Get the current time in Nigeria;
  const doneEvents = await eventModel.all({
    attributes: ['id', 'date'],
    where: {
      status: {
        [Op.ne]: 'done',
      },
    },
  });
  const doneEventIds = [];
  doneEvents.forEach((event) => {
    if (compareDate(currentDate, new Date(event.date), 24 * 60 * 60 * 1000)) {
      doneEventIds.push(event.id);
    }
  });
  await eventModel.update({ status: 'done' }, {
    where: {
      id: {
        [Op.in]: doneEventIds,
      },
    },
  });
  await transactionModel.destroy({
    where: {
      eventId: {
        [Op.in]: doneEventIds,
      },
    },
  });
  return; // eslint-disable-line no-useless-return
};

/**
 * Creates a super admin user.
 * @param {Object} userModel The query interface for the users in the database.
 * @returns {Object} The superAdmin created.
 */
export const createSuperAdmin = async (userModel) => {
  const user = await userModel.findOne({
    where: {
      email: process.env.SUPER_ADMIN_EMAIL,
    },
  });
  if (!user) {
    const superAdmin = await userModel.create({
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'superAdmin',
    });
    return superAdmin;
  }
};

/**
 * Uploads an image to the cloud at cloudinary.
 * @param {Object} image The image file.
 * @returns  {Promise}  A promise that either resolves
 * the respnose of cloudinary or reject any error that occured.
 */
export const uploadImage = async (image) => {
  const cloudinaryOptions = {
    resource_type: 'raw',
    format: 'jpg',
    folder: process.env.CLOUDINARY_CLOUD_FOLDER || '',
  };
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(cloudinaryOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(image.buffer);
  });
};

/**
 * Deletes an image in the cloud.
 * @param {String} imageUrl The url of the image.
 * @returns {Promise} A promise that either resolves the
 * respnose of cloudinary or reject any error that occured.
 */
export const deleteImage = (imageUrl) => {
  const cloudinaryOptions = {
    resource_type: 'raw',
    invalidate: true,
  };
  const urlMatch = /https:\/\/res.cloudinary.com\/tunmise\/raw\/upload\/(.*?)\/(.*)/;
  const imagePublicId = imageUrl.match(urlMatch)[2];
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(imagePublicId, cloudinaryOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Sends email.
 * @param {Object} details The detials of the email to send.
 */
export const sendMail = (details) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    secure: false,
  });
  const mailOptions = {
    from: 'admin@ievents.com',
    to: details.recipient,
    subject: details.subject,
    html: details.body,
  };
  transporter.sendMail(mailOptions);
};
