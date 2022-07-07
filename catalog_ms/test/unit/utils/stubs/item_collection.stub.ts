import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import createdItemStub from '@test/unit/utils/stubs/created_item.stub'

const itemCollectionStub = (): Array<CatalogItemDTO> => ([
  createdItemStub(),
  createdItemStub(),
  createdItemStub()
]);

export default itemCollectionStub;
