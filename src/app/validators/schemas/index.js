import { Joi } from 'celebrate';

export const pagination = {
  page: Joi.number().min(1).label('Page'),
  page_size: Joi.number().min(1).label('Page Size'),
};

export const sorting = {
  sort_in: Joi.string().trim().only(['ASC', 'DESC']).label('Sort key'),
  sort_by: Joi.string().trim().label('Sort direction'),
};
