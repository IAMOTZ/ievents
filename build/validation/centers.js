'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  create: function create(inputData) {
    var name = inputData.name,
        location = inputData.location,
        details = inputData.details,
        capacity = inputData.capacity,
        type = inputData.type,
        price = inputData.price;


    if (name === undefined) {
      return 'center name has to be given';
    }
    if (name === '') {
      return 'center name cannot be empty';
    }
    if (name.length < 5 || name.length > 30) {
      return 'center name must be between 5 and 25 characters';
    }
    if (location !== undefined && location.length > 30) {
      return 'center location must be below 30 characters';
    }
    if (details !== undefined && details.length > 200) {
      return 'center details must be below 200 characters';
    }
    if (capacity !== undefined) {
      var noCapacity = Number(capacity);
      if (!Number.isFinite(noCapacity)) {
        return 'center capacity must be a number in string format';
      }
    }
    if (type === undefined) {
      return 'center type has to be given';
    }
    if (type !== 'theater' && type !== 'banquet') {
      return 'center type can either be theater or banquet';
    }
    if (price !== undefined) {
      var noPrice = Number(price);
      if (!Number.isFinite(noPrice)) {
        return 'center price must be a number in string format';
      }
    }
    return 'success';
  },
  update: function update(inputData) {
    var name = inputData.name,
        location = inputData.location,
        details = inputData.details,
        capacity = inputData.capacity,
        type = inputData.type,
        price = inputData.price;

    if (name !== undefined && name === '') {
      return 'center name cannot be empty';
    }
    if (name !== undefined && name.length < 5) {
      return 'center name must be between 5 and 25 characters';
    }
    if (name !== undefined && name.length > 30) {
      return 'center name must be between 5 and 25 characters';
    }
    if (location !== undefined && location.length > 30) {
      return 'center location must be below 30 characters';
    }
    if (details !== undefined && details.length > 200) {
      return 'center details must be below 200 characters';
    }
    if (capacity !== undefined) {
      var noCapacity = Number(capacity);
      if (!Number.isFinite(noCapacity)) {
        return 'center capacity must be a number in string format';
      }
    }
    if (type !== undefined && type !== 'theater' && type !== 'banquet') {
      return 'center type can either be theater or banquet';
    }
    if (price !== undefined) {
      var noPrice = Number(price);
      if (!Number.isFinite(noPrice)) {
        return 'center price must be a number in string format';
      }
    }
    return 'success';
  }
};