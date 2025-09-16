// core/src/storage/ElectronStorageAdapter.ts
import { IStorage } from './IStorage';
import Store from 'electron-store';

export class ElectronStorageAdapter implements IStorage {
  private store: Store;

  constructor() {
    this.store = new Store();
  }

  async load<T>(key: string): Promise<T | null> {
    return this.store.get(key) as T | null;
  }

  async save<T>(key: string,  T): Promise<void> {
    this.store.set(key, data);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }
}