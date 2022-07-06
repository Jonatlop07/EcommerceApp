import createdItemStub from '@test/unit/utils/stubs/created_item.stub'

const CatalogRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdItemStub())
});

export default CatalogRepositoryMock;
