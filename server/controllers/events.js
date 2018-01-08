import db from '../models/index';

const { events, centers, transactions } = db;

const formatEventData = (eventData) => {
  return Object.assign(
    {},
    {
      id: eventData.id,
      centerId: eventData.centerId,
      userId: eventData.userId,
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      status: eventData.status,
    }
  )
}

const getCenter = async (centerModel, centerId) => {
  const center = await centerModel.findById(Number(centerId));
  return center;
}

const isCenterBooked = async (eventModel, centerId, date) => {
  const event =
    await eventModel.findOne({
      where: {
        date,
        centerId,
        status: 'allowed',
      }
    });
  if (event) {
    return true;
  } else {
    return false;
  }
}

const createTransaction = async (transactionModel, event) => {
  const transaction = await transactionModel.create({
    eventId: event.id,
    centerId: event.centerId,
  });
  return transaction;
}

const deleteTransaction = async (transactionModel, event) => {
  await transactionModel.destroy({
    where: {
      eventId: event.id,
    }
  });
}

export default {
  async getAll(req, res) {
    const userId = req.decoded.id;
    const allEvents = await events.all({
      where: { userId },
    });
    return res.status(200).json({
      status: 'success',
      message: 'events successfully retrieved',
      events: allEvents.map((event) => formatEventData(event)),
    });
  },

  async create(req, res) {
    const {
      title, description, date, centerid,
    } = res.locals.formattedInputs;
    const userId = req.decoded.id;
    const choosenCenter = await getCenter(centers, centerid);
    if (!choosenCenter) {
      return res.status(400).json({
        status: 'failed',
        message: 'the choosen center does not exist',
      });
    } else {
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (centerIsBooked) {
        return res.status(400).json({
          status: 'failed',
          message: 'the center has been booked for that date',
        });
      } else {
        const newEvent = await events.create({
          title,
          description,
          date,
          userId,
          centerId: centerid,
        });
        await createTransaction(transactions, newEvent);
        return res.status(201).json({
          status: 'success',
          message: 'event created',
          event: formatEventData(newEvent),
        });
      }
    }
  },

  async update(req, res) {
    const {
      title, description, date, centerid,
    } = res.locals.formattedInputs;
    const event = res.locals.event;    
    let updatedEvent = null;
    if (centerid && event.centerId !== Number(centerid)) {
      const newChoosenCenter = await getCenter(centers, centerid);
      const centerIsBooked = await isCenterBooked(events, centerid, date);
      if (!newChoosenCenter) {
        return res.status(400).json({
          status: 'failed',
          message: 'the new choosen center does not exist',
        });
      } else if (centerIsBooked) {
        return res.status(400).json({
          status: 'failed',
          message: 'the center has been booked for that date',
        });
      } else {
        updatedEvent = await event.update({
          title: title || event.title,
          date: date || event.date,
          centerId: newChoosenCenter.id,
          description: description || event.description,
        });
        await deleteTransaction(transactions, updatedEvent);
        await createTransaction(transactions, updatedEvent);
      }
    } else {
      updatedEvent = await event.update({
        title: title || event.title,
        date: date || event.date,
        description: description || event.description,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'event updated',
      event: formatEventData(updatedEvent),
    });
  },

  async delete(req, res) {
    const event = res.locals.event; 
    await event.destroy();
    res.status(200).json({
      status: 'success',
      message: 'event deleted',
    });
  },
};
