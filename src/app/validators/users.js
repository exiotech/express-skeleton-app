import { celebrate, Joi } from 'celebrate';
import { getCRUDValidators, mergeIndexValidator } from './helpers';

const SCHEMA = {
  firstName: Joi.string().label('First Name'),
  lastName: Joi.string().label('Last Name'),
  username: Joi.string().label('Username'),
  password: Joi.string().label('Password'),
};

export default {
  index: mergeIndexValidator({
    search: Joi.string(),
    firstName: Joi.string().label('First Name'),
    lastName: Joi.string().label('Last Name'),
    username: Joi.string().label('Username'),
    role: Joi.number(),
  }),
  ...getCRUDValidators(SCHEMA),
  updateCurrent: celebrate({
    body: SCHEMA,
  }),
};
