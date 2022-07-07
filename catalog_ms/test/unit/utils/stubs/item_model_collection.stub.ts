import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'
import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub'

const itemModelCollectionStub = (): Array<CatalogItem> => ([
  createdCatalogItemModelStub(),
  createdCatalogItemModelStub()
]);

export default itemModelCollectionStub;
