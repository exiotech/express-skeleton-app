import { celebrate, Joi } from 'celebrate';
import { pagination, sorting } from '../schemas';

export function getCRUDValidators(schema) {
  const create = celebrate({
    body: schema,
  });

  const show = celebrate({
    params: {
      id: Joi.number(),
    },
  });

  const update = celebrate({
    params: {
      id: Joi.number(),
    },
    body: schema,
  });

  const destroy = celebrate({
    params: {
      id: Joi.number(),
    },
  });

  return {
    create,
    show,
    update,
    destroy,
  };
}

export function mergeIndexValidator(query) {
  return celebrate({
    query: {
      ...pagination,
      ...sorting,
      ...query,
    },
  });
}
