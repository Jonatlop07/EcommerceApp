import createdItemStub from '@test/unit/utils/stubs/created_item.stub';
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub';

const CatalogRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdItemStub()),
  findAll: jest.fn().mockResolvedValue(itemCollectionStub())
});

export default CatalogRepositoryMock;
