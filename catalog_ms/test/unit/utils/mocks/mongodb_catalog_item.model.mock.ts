import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model';
import MongoDBModelMock from '@test/unit/utils/mocks/mongodb.model.mock';
import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub';

export default class MongoDBCatalogItemModelMock extends MongoDBModelMock<CatalogItem> {
  protected entity_stub: CatalogItem = createdCatalogItemModelStub();
}
