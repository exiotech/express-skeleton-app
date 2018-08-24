import { merge } from 'lodash';

const envConfs = require(`./${process.env.NODE_ENV}`);

const defConfs = {
};

module.exports = merge(defConfs, envConfs);
