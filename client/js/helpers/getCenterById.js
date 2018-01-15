import _ from 'lodash';

// This helper helps to get just one center from a center array.
export default (centers, id) => _.find(centers, { id: Number(id) });
