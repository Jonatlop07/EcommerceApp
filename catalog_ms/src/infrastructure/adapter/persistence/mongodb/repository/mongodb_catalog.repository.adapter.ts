import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import { Inject, Logger } from '@nestjs/common'
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens'
import MongoDBCatalogRepository
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository'
import CatalogItemDocument from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.document'
import CreateCatalogItemDataMapper
  from '@infrastructure/adapter/persistence/mongodb/entity/mapper/create_catalog_item_data.mapper'
import CatalogItemMapper from '@infrastructure/adapter/persistence/mongodb/entity/mapper/catalog_item.mapper'
import QueryCatalogQueryModel from '@core/domain/catalog/use-case/query-model/query_catalog.query_model'
import { PaginationDTO } from '@core/common/persistence/pagination.dto'

export default class MongoDBCatalogRepositoryAdapter implements CatalogRepository {
  private readonly logger: Logger = new Logger(MongoDBCatalogRepositoryAdapter.name);

  constructor(
    @Inject(MongoDBDITokens.CatalogRepository)
    private readonly repository: MongoDBCatalogRepository
  ) {}

  public async create(catalog_item_dto: CatalogItemDTO): Promise<CatalogItemDTO> {
    const catalog_item: CatalogItemDocument = await this.repository.create(
      CreateCatalogItemDataMapper.toDocumentDTO(catalog_item_dto)
    );
    return CatalogItemMapper.toDTO(catalog_item);
  }

  public async findAll(params: QueryCatalogQueryModel, pagination?: PaginationDTO): Promise<CatalogItemDTO[]> {
    return Promise.resolve([]);
  }
}
