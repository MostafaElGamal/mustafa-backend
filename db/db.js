import { JsonDB } from 'node-json-db';

export const collections = [ '/users'];

export async function connect({ dbConfig }) {
  const db = new JsonDB(dbConfig);
  await Promise.all(collections.map(async c => {
    if (!await db.exists(c)) {
      await db.push(c, []);
    }
  }));
  return db;
}

