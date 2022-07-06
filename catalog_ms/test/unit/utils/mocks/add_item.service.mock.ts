import createdItemStub from '@test/unit/utils/stubs/created_item.stub'

const AddItemServiceMock = jest.fn().mockReturnValue({
  execute: jest.fn().mockResolvedValue({
    created_item: createdItemStub()
  })
});

export default AddItemServiceMock;
