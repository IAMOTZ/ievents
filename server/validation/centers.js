export default {
  create(inputData) {
    const {
      name,
      location,
      details,
      capacity,
      type,
      price,
    } = inputData;

    if (name === undefined || name === null) {
      return 'center name is required';
    }
    if (name === '') {
      return 'center name cannot be empty';
    }
    if (name.length < 5 || name.length > 30) {
      return 'center name must be between 5 and 30 characters';
    }
    if (location && location.length > 30) {
      return 'center location must be below 30 characters';
    }
    if (details && details.length > 200) {
      return 'center details must be below 200 characters';
    }
    if (capacity) {
      const noCapacity = Number(capacity);
      if (!Number.isFinite(noCapacity)) {
        return 'center capacity must be a number in string format';
      }
    }
    if (type === undefined || type === null) {
      return 'center type is required';
    }
    if (type !== 'theater' && type !== 'banquet') {
      return 'center type can either be theater or banquet';
    }
    if (price) {
      const noPrice = Number(price);
      if (!Number.isFinite(noPrice)) {
        return 'center price must be a number in string format';
      }
    }
    return 'success';
  },

  update(inputData) {
    const {
      name,
      location,
      details,
      capacity,
      type,
      price,
    } = inputData;
    if (name !== undefined && name === '') {
      return 'center name cannot be empty';
    }
    if (name && name.length < 5) {
      return 'center name must be between 5 and 30 characters';
    }
    if (name && name.length > 30) {
      return 'center name must be between 5 and 30 characters';
    }
    if (location && location.length >= 50) {
      return 'center location must be below 50 characters';
    }
    if (details && details.length > 200) {
      return 'center details must be below 200 characters';
    }
    if (capacity) {
      if (!Number.isFinite(Number(capacity))) {
        return 'center capacity must be a number in string format';
      }
    }
    if (type !== undefined && type !== 'theater' && type !== 'banquet') {
      return 'center type can either be theater or banquet';
    }
    if (price) {
      if (!Number.isFinite(Number(price))) {
        return 'center price must be a number in string format';
      }
    }
    return 'success';
  },
};
