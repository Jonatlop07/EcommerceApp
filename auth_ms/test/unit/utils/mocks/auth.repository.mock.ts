import createdAccountDTOStub from '@test/unit/utils/stubs/created_account.dto.stub';

const AuthRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createdAccountDTOStub()),
  exists: jest.fn().mockResolvedValue(false),
  findOne: jest.fn().mockResolvedValue(undefined)
});

export default AuthRepositoryMock;
