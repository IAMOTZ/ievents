import db from '../models';
import { uploadImage, deleteImage } from '../helpers';

const { centers, events } = db;

const getDatesFromEvents = (events) => {
  return events.filter(event => event.status === 'allowed').map(event => event.date);
}

const getCenter = async (centerModel, centerId) => {
  const center = await centerModel.findById(Number(centerId));
  return center;
}

const formatCenterData = (centerData) => {
  return Object.assign(
    {},
    {
      id: centerData.id,
      name: centerData.name,
      location: centerData.location,
      details: centerData.details,
      capacity: centerData.capacity,
      price: centerData.price,
      images: centerData.images,
      bookedOn: centerData.events ? getDatesFromEvents(centerData.events) : null,
    }
  );
};

export default {
  async getAll(req, res) {
    const allCenters = await centers.all({
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
    });
    return res.status(200).json({
      status: 'success',
      message: 'centers successfully retrieved',
      centers: allCenters.map((center) => formatCenterData(center)),
    });
  },

  async getOne(req, res) {
    const centerId = req.params.id;
    const center = await centers.findOne({
      where: {
        id: centerId,
      },
      include: [{
        model: events,
        attributes: ['status', 'date'],
      }],
    });
    if (!center) {
      return res.status(400).json({
        status: 'failed',
        message: 'center does not exist',
      });
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'center successfully retrieved',
        center: formatCenterData(center),
      });
    }
  },

  async create(req, res) {
    const {
      name, location, details, capacity, price,
    } = res.locals.formattedInputs;
    const userId = req.decoded.id;
    let image = null;
    if (req.file) {
      image = await uploadImage(req.file);
    }
    const newCenter =
      await centers.create({
        name,
        location,
        details,
        capacity,
        price,
        images: image ? [image.secure_url] : null,
        userId,
      });
    return res.status(201).json({
      status: 'success',
      message: 'center created',
      center: formatCenterData(newCenter),
    });
  },

  async update(req, res) {
    const {
      name, location, details, capacity, price,
    } = res.locals.formattedInputs;
    const centerId = req.params.id;
    const center = await getCenter(centers, centerId);
    if (!center) {
      return res.status(400).json({
        status: 'failed',
        message: 'center does not exist'
      });
    } else {
      let image = null;
      if (req.file) {
        image = await uploadImage(req.file);
        await deleteImage(center.images[0]);
      }
      const updatedCenter =
        await center.update({
          name: name || center.name,
          location: location || center.location,
          details: details || center.details,
          capacity: capacity || center.capacity,
          price: price || center.price,
          images: image ? [image.secure_url] : center.images
        });
      return res.status(200).json({
        status: 'success',
        message: 'center updated',
        center: formatCenterData(updatedCenter),
      });
    }
  }
}
