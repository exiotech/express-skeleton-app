import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';

export const LOG_TYPES = [
  'AUTH_LOGIN',
  'AUTH_LOGOUT',
  'CLICK',
];

const EventLogSchema = BaseSchema.extend({
  type: {
    type: String,
    enum: LOG_TYPES,
    required: true,
  },
  meta: {
    type: Schema.Types.Mixed,
  },
  user: {
    type: Number,
    ref: 'User',
  },
});

export default mongoose.model('EventLog', EventLogSchema);
