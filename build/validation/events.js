'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  create: function create(inputData) {
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date,
        centername = inputData.centername;

    if (title === undefined) {
      return 'event title is required';
    }
    if (title === '') {
      return 'event title cannot be empty';
    }
    if (title.length < 5 || title.length > 20) {
      return 'event title must be between 5 and 20 characters';
    }
    if (description !== undefined && description.length > 200) {
      return 'event description must be below 200 characters';
    }
    if (date === undefined) {
      return 'event date is required';
    }
    if (date !== undefined) {
      var dateData = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
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
      return 'date is required if a center is choosen';
    }
    return 'success';
  },
  update: function update(inputData) {
    var title = inputData.title,
        description = inputData.description,
        date = inputData.date;

    if (title !== undefined && title === '') {
      return 'event title cannot be empty';
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
      var dateData = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
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
  }
};