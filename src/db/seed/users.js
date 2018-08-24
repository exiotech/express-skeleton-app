import faker from 'faker';
import { capitalize } from 'lodash';
import Log from 'lib/logger';
import { USER_ROLES } from 'const/user';
import {
  createUser,
} from 'services/users';

export async function seedUsers(count) {
  try {
    await Promise.all(Object.keys(USER_ROLES).map(role => createUser({
      firstName: capitalize(role),
      lastName: 'User',
      username: role.toLowerCase(),
      password: 'secret',
      role: USER_ROLES[role],
    })));
    const promises = [];
    for (let i = 0; i < count; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      promises.push(createUser({
        firstName,
        lastName,
        username: `${firstName}.${lastName}`.toLowerCase(),
        password: 'secret',
        role: USER_ROLES.USER,
      }));
    }
    await Promise.all(promises);
  } catch (e) {
    Log.error(e);
  }
}
