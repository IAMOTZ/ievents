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
      const noCapacity = Number(capacity);
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
      const noCapacity = Number(capacity);
      if (!Number.isFinite(noCapacity)) {
        return 'center capacity must be a number in string format';
      }
    }
    if (type !== undefined && type !== 'theater' && type !== 'banquet') {
      return 'center type can either be theater or banquet';
    }
    if (price !== undefined) {
      const noPrice = Number(price);
      if (!Number.isFinite(noPrice)) {
        return 'center price must be a number in string format';
      }
    }
    return 'success';
  },
};
