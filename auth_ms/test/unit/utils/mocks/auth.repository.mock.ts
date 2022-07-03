import created_account_dto_stub from '@test/unit/utils/stubs/created_account.dto.stub';

const AuthRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(created_account_dto_stub()),
  exists: jest.fn().mockReturnValue(false),
});

export default AuthRepositoryMock;
