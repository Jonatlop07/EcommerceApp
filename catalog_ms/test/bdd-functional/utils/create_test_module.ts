import { Test } from '@nestjs/testing';
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import AddItemService from '@core/service/add_item.service'
import CatalogInMemoryRepository from '@infrastructure/adapter/persistence/in-memory/catalog_in_memory.repository'

export function createTestModule() {
  return Test.createTestingModule({
    providers: [
      {
        provide: CatalogDITokens.CatalogRepository,
        useFactory: () => new CatalogInMemoryRepository(new Map())
      },
      {
        provide: CatalogDITokens.AddItemInteractor,
        useFactory: (gateway) => new AddItemService(gateway),
        inject: [CatalogDITokens.CatalogRepository]
      }
    ]
  }).compile();
}
