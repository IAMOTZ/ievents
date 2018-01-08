import sequelize from 'sequelize';
import dotEnv from 'dotenv';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERCRET,
});
dotEnv.config();

const Op = sequelize.Op;

const compareDate = (date1, date2, offset) => {
  if (date1.getTime() > date2.getTime() + offset) {
    return true;
  } else {
    return false;
  }
}

export const getCurrentDate = (timeZoneOffset) => {
  const localDate = new Date();
  const UTCTime = new Date(
    localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(),
    localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds(),
    localDate.getUTCMilliseconds()
  ).getTime();
  return new Date(UTCTime + (timeZoneOffset * 60 * 60 * 1000));
}

export const updateEventStatus = async (eventModel, transactionModel) => {
  const currentDate = getCurrentDate(1); // Get the current time in Nigeria;
  const doneEvents = await eventModel.all({
    attributes: ['id', 'date'],
    where: {
      status: {
        [Op.ne]: 'done',
      }
    }
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
        [Op.in]: doneEventIds
      }
    }
  });
  await transactionModel.destroy({
    where: {
      eventId: {
        [Op.in]: doneEventIds
      }
    }
  });
  return;
}

export const createSuperAdmin = async (userModel) => {
  const user = await userModel.findOne({
    where: {
      email: process.env.SUPER_ADMIN_EMAIL
    }
  });
  if (user) {
    return;
  } else {
    await userModel.create({
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'superAdmin',
    });
    return;
  }
}

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
}

export const deleteImage = (imageUrl) => {
  const cloudinaryOptions = {
    resource_type: 'raw',
    invalidate: true,
  }
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
}
