import jwt from 'jsonwebtoken';
import config from 'config';
import { generateSalt } from 'lib/security';

export function createJwtToken(user, options = {}) {
  const {
    expiresIn = config.jwt.expires,
    key = config.jwt.key,
    status = 'user',
  } = options;
  const data = Object.assign({}, user.token, { status });
  return jwt.sign(data, key, {
    expiresIn,
    issuer: config.jwt.issuer,
    jwtid: generateSalt(32),
  });
}
