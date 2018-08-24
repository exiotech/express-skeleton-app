import User from 'model/User';
import { seedUsers } from './users';


require('../connect');

async function seed() {
  await User.deleteMany({});

  await seedUsers(50);
  return true;
}

seed().then(() => {
  process.exit();
});
