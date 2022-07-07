import { Document, FilterQuery, Model } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entity_model: Model<T>) {}

  public async create(create_entity_data: unknown): Promise<T> {
    const entity = await this.entity_model.create(create_entity_data);
    return await entity.save();
  }

  public async findAll(
    entity_filter_query: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<Array<T>> {
    return await this.entity_model
      .find(entity_filter_query,
        {
          _id: 0,
          __v: 0,
          ...projection
        })
      .exec();
  }
}
