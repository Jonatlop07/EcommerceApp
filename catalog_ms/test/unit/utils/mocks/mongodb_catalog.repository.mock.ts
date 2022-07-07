import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub';
import itemModelCollectionStub from '@test/unit/utils/stubs/item_model_collection.stub';

const MongoDBCatalogRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdCatalogItemModelStub()),
  findAll: jest.fn().mockResolvedValue(itemModelCollectionStub())
});

export default MongoDBCatalogRepositoryMock;
