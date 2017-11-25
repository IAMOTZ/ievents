export default {
  create(inputData) {
    const {
      title,
      description,
      date,
      centername,
    } = inputData;
    if (title === undefined) {
      return 'title has to be given';
    }
    if (title === '') {
      return 'title cannot be empty';
    }
    if (title.length < 5 || title.length > 20) {
      return 'event title must be between 5 and 20 characters';
    }
    if (description !== undefined && description.length > 200) {
      return 'event description must be below 200 characters';
    }
    if (date === undefined) {
      return 'date must be given';
    }
    if (date !== undefined) {
      const dateData = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!dateData) {
        return 'the date format should be dd/mm/yyyy';
      }
      if (dateData[1] > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (dateData[2] > 12) {
        return 'month in the date cannot be more than 12';
      }
    }
    if (centername !== undefined && date === undefined) {
      return 'date must be give if center is given';
    }
    return 'success';
  },

  update(inputData) {
    const {
      title,
      description,
      date,
    } = inputData;
    if (title !== undefined && title === '') {
      return 'title cannot be empty';
    }
    if (title !== undefined && title.length < 5) {
      return 'event title must be between 5 and 20 characters';
    }
    if (title !== undefined && title.length > 20) {
      return 'event title must be between 5 and 20 characters';
    }
    if (description !== undefined && description.length > 200) {
      return 'event description must be below 200 characters';
    }
    if (date !== undefined) {
      const dateData = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!dateData) {
        return 'the date format should be dd/mm/yyyy';
      }
      if (dateData[1] > 31) {
        return 'days in the date cannot be more than 31';
      }
      if (dateData[2] > 12) {
        return 'month in the date cannot be more than 12';
      }
    }
    return 'success';
  },
};
