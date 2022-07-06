import { EntityRepository } from '@infrastructure/adapter/persistence/mongodb/repository/entity.repository'
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import CatalogItemDocument
  from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.document'
import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'

export default class MongoDBCatalogRepository extends EntityRepository<CatalogItemDocument> {
  private readonly logger: Logger = new Logger(MongoDBCatalogRepository.name);

  constructor(
    @InjectModel(CatalogItem.name)
    private readonly catalog_item_model: Model<CatalogItemDocument>
  ) {
    super(catalog_item_model);
  }
}
