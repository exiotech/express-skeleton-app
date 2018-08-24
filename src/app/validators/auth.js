import { celebrate, Joi } from 'celebrate';

export const login = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().label('Username'),
    password: Joi.string().min(6).max(20).required()
      .label('Password'),
  }),
});

export const register = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().label('First Name'),
    lastName: Joi.string().label('Last Name'),
    username: Joi.string().required().label('Username'),
    password: Joi.string().min(6).max(20).required()
      .label('Password'),
  }),
});
