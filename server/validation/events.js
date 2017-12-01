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
      const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      if (!dateData) {
        return 'the date format should be yyyy/mm/dd';
      }
      if (dateData[3] > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (dateData[2] > 12) {
        return 'month in the date cannot be more than 12';
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
      const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      if (!dateData) {
        return 'the date format should be yyyy/mm/dd';
      }
      if (dateData[3] > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (dateData[2] > 12) {
        return 'month in the date cannot be more than 12';
      }
    }
    if (centerid && !Number.isInteger(Number(centerid))) {
      return 'cemter id must be and integer in a string format';
    }
    return 'success';
  },
};
