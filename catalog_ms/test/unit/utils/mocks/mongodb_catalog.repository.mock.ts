import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub'

const MongoDBCatalogRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdCatalogItemModelStub())
});

export default MongoDBCatalogRepositoryMock;
