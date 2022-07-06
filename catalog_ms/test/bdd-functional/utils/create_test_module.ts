import { Test } from '@nestjs/testing';
import CatalogDITokens from '@core/domain/catalog/use-case/dto/catalog_di_tokens'
import AddItemService from '@core/service/add_item.service'

export function createTestModule() {
  return Test.createTestingModule({
    providers: [
      {
        provide: CatalogDITokens.AddItemInteractor,
        useFactory: () => new AddItemService()
      }
    ]
  }).compile();
}
