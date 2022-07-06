import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import { Inject, Logger } from '@nestjs/common'
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens'
import MongoDBCatalogRepository
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository'

export default class MongoDBCatalogRepositoryAdapter implements CatalogRepository {
  private readonly logger: Logger = new Logger(MongoDBCatalogRepositoryAdapter.name);

  constructor(
    @Inject(MongoDBDITokens.CatalogRepository)
    private readonly repository: MongoDBCatalogRepository
  ) {}

  public async create(catalog_item_dto: CatalogItemDTO): Promise<CatalogItemDTO> {
    return Promise.resolve(undefined);
  }
}
