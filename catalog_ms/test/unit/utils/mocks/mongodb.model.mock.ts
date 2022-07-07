import { FilterQuery } from 'mongoose';
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub'

export default abstract class MongoDBModelMock<T> {
  protected abstract entity_stub: T;
  protected abstract entity_collection_stub: Array<T>;

  public async create(create_entity_data: T): Promise<{}> {
    return  {
      save: (): Promise<T> => Promise.resolve(this.entity_stub)
    }
  }

  public find(
    entity_filter_query: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): { exec: () => Promise<Array<T>> } {
    return {
      exec: (): Promise<Array<T>> => Promise.resolve(this.entity_collection_stub)
    };
  }
}
