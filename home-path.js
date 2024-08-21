import { fileURLToPath, URL } from 'node:url';

export const homePath = fileURLToPath(new URL('.', import.meta.url));
