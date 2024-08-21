import { pbkdf2 as pbkdf2Cb } from 'node:crypto';
import { promisify } from 'node:util';
import jwt from 'jsonwebtoken';
import { knownErrors } from './errors.js';

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const pbkdf2 = promisify(pbkdf2Cb);

const secret = 'shhhh';
const salt = 'salt';

export async function hashPassword(password) {
  const buffer = await pbkdf2(password, salt, 1000, 64, 'sha512');
  return buffer.toString('hex');
}

export function createToken(id, name, email) {
  return sign({
    id,
    name,
    email,
  }, secret, { expiresIn: '20min' });
}

export function createRefreshToken(token) {
  return sign({
    token,
  }, secret, { expiresIn: '7day' });
}

export async function checkToken(token) {
  const decoded = await verify(token, secret, {});
  return { id: decoded.id, name: decoded.name, email: decoded.email };
}

export async function createAuthTokens(id, name, email) {
  const token = await createToken(id, name, email);
  return {
    token,
    refreshToken: await createRefreshToken(token),
  };
}

export function extractTokenFromHeader(req) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return null;
  }
  if (!authHeader.startsWith('Bearer ')) {
    return knownErrors.badRequest();
  }
  return authHeader.substring(7);
}
