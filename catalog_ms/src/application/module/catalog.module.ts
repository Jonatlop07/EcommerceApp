import { Module, Provider } from '@nestjs/common'
import CatalogController from '@application/api/http-rest/controller/catalog.controller'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import AddItemService from '@core/service/add_item.service'
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens'
import MongoDBCatalogRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository'
import MongoDBCatalogRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository.adapter'
import QueryCatalogService from '@core/service/query_catalog.service'

const persistence_providers: Array<Provider> = [
  {
    provide: MongoDBDITokens.CatalogRepositoryAdapter,
    useClass: MongoDBCatalogRepository
  },
  {
    provide: CatalogDITokens.CatalogRepository,
    useFactory: (repository) => new MongoDBCatalogRepositoryAdapter(repository),
    inject: [MongoDBDITokens.CatalogRepositoryAdapter]
  }
];

const use_case_providers: Array<Provider> = [
  {
    provide: CatalogDITokens.AddItemInteractor,
    useFactory: (gateway) => new AddItemService(gateway),
    inject: [CatalogDITokens.CatalogRepository]
  },
  {
    provide: CatalogDITokens.QueryCatalogInteractor,
    useFactory: (gateway) => new QueryCatalogService(gateway),
    inject: [CatalogDITokens.CatalogRepository]
  }
];

@Module({
  controllers: [CatalogController],
  providers: [
    ...persistence_providers,
    ...use_case_providers
  ]
})
export default class CatalogModule {}
