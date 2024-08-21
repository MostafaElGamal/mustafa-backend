import * as uuid from 'uuid';
import { hashPassword, checkToken, createAuthTokens, knownErrors } from '#utils';

const userCollection = '/users';

export class Api {
  constructor({ db, useAsync }) {
    this.db = db;
    this.useAsync = useAsync;
  }
  async register(name, email, password) {
    const db = await this.db;
    const id = uuid.v4();
    const tokens = await createAuthTokens(id, name, email);
    const user = {
      id,
      name,
      email,
      password: await hashPassword(password),
      ...tokens,
    };
    await db.push(`${userCollection}[]`, user);
    return { ...tokens, id, name, email };
  }

  async login(email, password) {
    const db = await this.db;
    const hashedPass = await hashPassword(password);
    const allData = await db.getData(userCollection);
    const user = allData.find(u => u.email === email && u.password === hashedPass);
    if (!user) {
      return Promise.reject(knownErrors.badCredentials());
    }
    const tokens = await createAuthTokens(user.id, user.name, user.email);
    const index = await db.getIndex(userCollection, user.id);
    await db.push(`${userCollection}[${index}]`, tokens, false);
    return { id: user.id, name: user.name, email: user.email, ...tokens };
  }

  async refreshToken(token, refreshToken) {
    const db = await this.db;
    const indexToken = await db.getIndex(userCollection, token, 'token');
    if (indexToken === -1) {
      return Promise.reject(knownErrors.unauthenticated());
    }
    const user = await db.getData(`${userCollection}[${indexToken}]`);
    if (user.refreshToken !== refreshToken) {
      return Promise.reject(knownErrors.unauthenticated());
    }
    const tokens = await createAuthTokens(user.id, user.name, user.email);
    await db.push(`${userCollection}[${indexToken}]`, tokens, false);
    if (indexToken === -1) {
      return Promise.reject(knownErrors.unauthenticated());
    }
    return tokens;
  }

  async verifyToken(token) {
    const db = await this.db;
    const index = await db.getIndex(userCollection, token, 'token');
    if (index === -1) {
      return Promise.reject(knownErrors.unauthenticated());
    }
    try {
      const decoded = await checkToken(token);
      return { id: decoded.id, name: decoded.name, email: decoded.email };
    } catch (e) {
      return Promise.reject(knownErrors.unauthenticated());
    }
  }

}
