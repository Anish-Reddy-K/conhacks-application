import PocketBase from 'pocketbase';

if (!process.env.POCKETBASE_URL) {
  throw new Error('POCKETBASE_URL environment variable is not set');
}

export const pb = new PocketBase(process.env.POCKETBASE_URL);
