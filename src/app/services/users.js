import User from 'model/User';
import { parseQueryOptions } from 'lib/utils';

export function queryUsers(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  if (params.search) {
    query.$or = [{
      firstName: new RegExp(params.search, 'gi'),
    }, {
      lastName: new RegExp(params.search, 'gi'),
    }, {
      username: new RegExp(params.search, 'gi'),
    }];
  }
  if (params.firstName) {
    query.firstName = {
      $regex: new RegExp(params.firstName, 'gi'),
    };
  }
  if (params.lastName) {
    query.lastName = {
      $regex: new RegExp(params.lastName, 'gi'),
    };
  }
  if (params.username) {
    query.username = {
      $regex: new RegExp(params.username, 'gi'),
    };
  }
  if (params.role) {
    query.role = params.role;
  }
  return User.paginate(query, options)
    .then((result) => {
      const data = {
        ...result,
        users: result.docs,
      };
      delete data.docs;
      return data;
    });
}

export function getSingleUser(id) {
  return User.findById(id);
}

export async function createUser(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return User.create(data, createdById);
}

export function updateUser(id, data) {
  return User.findById(id)
    .then((user) => {
      user.mergeWithData(data);
      return user.save();
    });
}

export function deleteUser(id, deletedBy) {
  return User.findById(id)
    .then(user => user.delete(deletedBy));
}
