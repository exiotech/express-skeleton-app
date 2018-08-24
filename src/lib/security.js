import crypto from 'crypto';

const pbkdfOptions = {
  iterations: 2000,
  keylength: 128,
  algorithm: 'sha512',
};

/**
 * Generates salt
 *
 * @param  {Integer} Length of the salt
 * @return {String}  Salt
 */
export function generateSalt(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash the given password
 *
 * @param  {String}   password Password
 * @param  {String}   salt     Salt
 * @return {Promise}           Hashed password
 */
export function hashPassword(password, salt) {
  return new Promise((resolve, reject) => crypto.pbkdf2(
    password,
    salt,
    pbkdfOptions.iterations,
    pbkdfOptions.keylength,
    pbkdfOptions.algorithm,
    (err, key) => {
      if (!err) {
        return resolve(key.toString('hex'));
      }
      return reject(err);
    },
  ));
}

export function base64Encode(typedArray) {
  return Buffer.from(typedArray).toString('base64');
}

export function base64Decode(encodedString) {
  return new Uint8Array(Buffer.from(encodedString, 'base64'));
}
