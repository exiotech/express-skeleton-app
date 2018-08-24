import { Schema } from 'mongoose';
import 'mongoose-schema-extend';
import mongoosePaginate from 'mongoose-paginate';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseDelete from 'mongoose-delete';

const BaseSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
}, {
  toJSON: {
    transform(doc, ret) {
      Reflect.deleteProperty(ret, '_id');
      Reflect.deleteProperty(ret, '__v');
      Reflect.deleteProperty(ret, '___t');
      /* eslint-disable no-param-reassign */
      ret.id = doc._id;
    },
  },
});

BaseSchema.methods.mergeWithData = function (data) {
  Object.keys(data).forEach((prop) => {
    this[prop] = data[prop];
  });
  return this;
};

BaseSchema.statics.exists = function (query) {
  if (typeof query === 'string') {
    query = {
      _id: query,
    };
  }
  return this.countDocuments({
    ...query,
    deleted: {
      $ne: true,
    },
  }).then(count => !!count);
};

BaseSchema.statics.create = function (data, userId) {
  const doc = new this(data);
  if (userId) {
    doc.createdBy = userId;
  }
  return doc.save();
};

BaseSchema.plugin(mongoosePaginate);
BaseSchema.plugin(mongooseTimestamp);
BaseSchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

export default BaseSchema;
