
export function ExtendableBuiltin(cls) {
  function ExtendableBuiltin(...args) { // eslint-disable-line no-shadow
    Reflect.apply(cls, this, args);
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype);
  Reflect.setPrototypeOf(ExtendableBuiltin, cls);

  return ExtendableBuiltin;
}

export function createResponse(data, message = null, status = 200) {
  const success = status < 400;
  return {
    success,
    data,
    message,
  };
}

export function parseQueryOptions(query, defs = {}) {
  const options = JSON.parse(JSON.stringify(defs));
  const {
    page = 1,
    page_size: pageSize = 10,
  } = query;
  options.page = Number(page);
  options.limit = Number(pageSize);
  options.deleted = query.deleted || false;
  if (query.sort_by) {
    let sortBy = query.sort_by;
    if (sortBy === 'id') {
      sortBy = '_id';
    }
    options.sort = {};
    options.sort[sortBy] = query.sort_in === 'DESC' ? -1 : 1;
  }
  return options;
}

export function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
