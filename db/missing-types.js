import { readFile, open, mkdir } from 'fs/promises';
import * as path from 'path';

export class DbConfig {
  constructor(storage) {
    this.adapter = new JsonAdapter(storage, true);
    this.saveOnPush = true;
    this.separator = '/';
  }
}

export class FileAdapter {
  constructor(dbPath) {
    this.filename = dbPath;
    this.fsync = false;
  }
  async readAsync() {
    try {
      return await readFile(this.filename, {
        encoding: 'utf-8',
      });
    } catch (e) {
      if (e.code === 'ENOENT') {
        return null;
      }
      throw e;
    }
  }
  async writeAsync(data) {
    let fd = null;
    try {
      fd = await open(this.filename, 'w');
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
      const basePath = path.dirname(this.filename);
      await mkdir(basePath, { recursive: true });
      fd = await open(this.filename, 'w');
    }
    try {
      await fd.writeFile(data, {
        encoding: 'utf-8',
      });
      if (this.fsync) {
        await fd.sync();
      }
    } finally {
      await fd.close();
    }
  }
}

export class JsonAdapter {
  dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}', 'm');

  constructor(adapter, humanReadable = false) {
    this.adapter = adapter;
    this.humanReadable = humanReadable;
  }

  replacer(key, value) {
    return value;
  }

  reviver(key, value) {
    if (typeof value == 'string' && this.dateRegex.exec(value) != null) {
      return new Date(value);
    }
    return value;
  }

  async readAsync() {
    const data = await this.adapter.readAsync();
    if (data == null) {
      await this.writeAsync({});
      return {};
    }
    return JSON.parse(data, this.reviver.bind(this));
  }

  writeAsync(data) {
    let stringify = '';
    if (this.humanReadable) {
      stringify = JSON.stringify(data, this.replacer.bind(this), 4);
    } else {
      stringify = JSON.stringify(data, this.replacer.bind(this));
    }
    return this.adapter.writeAsync(stringify);
  }
}
