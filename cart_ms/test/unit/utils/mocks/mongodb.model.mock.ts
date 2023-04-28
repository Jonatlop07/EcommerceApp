import { FilterQuery } from 'mongoose';

export default abstract class MongoDBModelMock<T> {
  protected abstract entity_stub: T;

  public async create(create_entity_data: T): Promise<{}> {
    return {
      save: (): Promise<T> => Promise.resolve(this.entity_stub),
    };
  }

  public findOne(
    entity_filter_query: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): { exec: () => Promise<T> } {
    return {
      exec: (): Promise<T> => Promise.resolve(this.entity_stub),
    };
  }
}
