import { FilterQuery } from 'mongoose';

export default abstract class MongoDBModelMock<T> {
  protected abstract entity_stub: T;

  constructor(create_entity_data: T) {
    this.constructorSpy(create_entity_data);
  }

  public constructorSpy(create_entity_data: T): void {}

  public findOne(
    entity_filter_query: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): { exec: () => Promise<T> } {
    return {
      exec: (): Promise<T> => Promise.resolve(this.entity_stub)
    };
  }

  public async create(): Promise<T> {
    return Promise.resolve(this.entity_stub);
  }
}
