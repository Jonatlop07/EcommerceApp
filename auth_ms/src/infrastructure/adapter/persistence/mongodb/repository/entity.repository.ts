import { Document, FilterQuery, Model } from 'mongoose';
import { Nullable } from '@core/common/type/common_types';
import { AccountDTO } from '@core/domain/auth/dto/account.dto';
import CreateAccountDocumentDTO from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_account_document.dto';

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entity_model: Model<T>) {}

  public async findOne(
    entity_filter_query: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<Nullable<T>> {
    return await this.entity_model
      .findOne(
        entity_filter_query,
        {
          _id: 0,
          __v: 0,
          ...projection
      })
      .exec();
  }

  public async create(create_entity_data: unknown): Promise<T> {
    const entity = await this.entity_model.create(create_entity_data);
    return await entity.save();
  }
}
