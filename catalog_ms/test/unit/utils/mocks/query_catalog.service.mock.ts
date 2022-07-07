import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub'

const QueryCatalogServiceMock = jest.fn().mockReturnValue({
  execute: jest.fn().mockReturnValue({
    items: itemCollectionStub()
  })
});

export default QueryCatalogServiceMock;
