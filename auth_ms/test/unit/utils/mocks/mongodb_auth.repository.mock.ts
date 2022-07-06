import createdAccountModelStub from '@test/unit/utils/stubs/created_account.model.stub';

const MongoDBAuthRepositoryMock = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(createdAccountModelStub()),
  create: jest.fn().mockResolvedValue(createdAccountModelStub())
});

export default MongoDBAuthRepositoryMock;
