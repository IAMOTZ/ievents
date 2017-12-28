import { getCurrentDate } from '../helpers';

export default {
  create(inputData) {
    const {
      title,
      description,
      date,
      centerid,
    } = inputData;
    if (title === undefined || title === null) {
      return 'event title is required';
    }
    if (title === '') {
      return 'event title cannot be empty';
    }
    if (title.length < 5 || title.length > 30) {
      return 'event title must be between 5 and 30 characters';
    }
    if (description && description.length > 200) {
      return 'event description must be below 200 characters';
    }
    if (!date) {
      return 'event date is required';
    }
    if (date) {
      const dateData = date.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
      if (!dateData) {
        return 'the date format should be yyyy/mm/dd';
      }
      const currentTime = getCurrentDate(1);
      const currentYear = currentTime.getFullYear();
      const currentMonth = currentTime.getMonth() + 1;
      const currentDate = currentTime.getDate();
      const eventYear = Number(dateData[1]);
      const eventMonth = Number(dateData[2]);
      const eventDate = Number(dateData[3]);
      if (eventDate > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (eventMonth > 12) {
        return 'month in the date cannot be more than 12';
      }
      if (eventYear < currentYear) {
        return 'you can only create event for this year and upcoming years'
      }
      if (eventYear === currentYear && eventMonth < currentMonth) {
        return 'you can only create event for this month and upcoming months'
      }
      if (eventYear === currentYear && eventMonth === currentMonth && eventDate < currentDate) {
        return 'you can only create event for today and upcoming days'
      }
    }
    if (!centerid) {
      return 'center is required';
    }
    if (!Number.isInteger(Number(centerid))) {
      return 'cemter id must be and integer in a string format';
    }

    return 'success';
  },

  update(inputData) {
    const {
      title,
      description,
      date,
      centerid,
    } = inputData;
    if (title !== undefined && title === '') {
      return 'event title cannot be empty';
    }
    if (title && title.length < 5) {
      return 'event title must be between 5 and 20 characters';
    }
    if (title && title.length > 30) {
      return 'event title must be between 5 and 30 characters';
    }
    if (description && description.length > 200) {
      return 'event description must be below 200 characters';
    }
    if (date) {
      const dateData = date.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
      if (!dateData) {
        return 'the date format should be yyyy/mm/dd';
      }
      const currentTime = getCurrentDate(1);
      const currentYear = currentTime.getFullYear();
      const currentMonth = currentTime.getMonth() + 1;
      const currentDate = currentTime.getDate();
      const eventYear = Number(dateData[1]);
      const eventMonth = Number(dateData[2]);
      const eventDate = Number(dateData[3]);
      if (eventDate > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (eventMonth > 12) {
        return 'month in the date cannot be more than 12';
      }
      if (eventYear < currentYear) {
        return 'you can only create event for this year and upcoming years'
      }
      if (eventYear === currentYear && eventMonth < currentMonth) {
        return 'you can only create event for this month and upcoming months'
      }
      if (eventYear === currentYear && eventMonth === currentMonth && eventDate < currentDate) {
        return 'you can only create event for today and upcoming days'
      }
    }
    if (centerid && !Number.isInteger(Number(centerid))) {
      return 'cemter id must be and integer in a string format';
    }
    return 'success';
  },
};
