export interface IStorage {
  load<T>(key: string): Promise<T | null>;
  save<T>(key: string,  T): Promise<void>;
  remove(key: string): Promise<void>;
}