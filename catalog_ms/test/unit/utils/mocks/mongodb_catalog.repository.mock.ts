import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub'
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub'

const MongoDBCatalogRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdCatalogItemModelStub()),
  findAll: jest.fn().mockResolvedValue(itemCollectionStub())
});

export default MongoDBCatalogRepositoryMock;
