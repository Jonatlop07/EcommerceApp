import SignUpService from '@core/service/auth/sign_up.service';
import { Test } from '@nestjs/testing';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import AuthRepository from '@core/domain/auth/use-case/repository/auth.repository';
import AuthRepositoryMock from '@test/unit/utils/mocks/auth.repository.mock';
import { sign_up_credentials_stub } from '@test/unit/utils/stubs/sign_up_credentials.stub';

describe('SignUpService', () => {
  let sign_up_service: SignUpService;
  let auth_repository: AuthRepository;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: AuthDITokens.AuthRepository,
          useClass: AuthRepositoryMock
        },
        SignUpService
      ]
    }).compile();

    sign_up_service = module_ref.get<SignUpService>(SignUpService);
    auth_repository = module_ref.get<AuthRepository>(AuthDITokens.AuthRepository);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    describe('when execute is called', () => {
      beforeEach(async () => {
        await sign_up_service.execute(sign_up_credentials_stub())
      });

      it('should call gateway.exists', () => {
        expect(auth_repository.exists)
          .toBeCalledWith({
            username: sign_up_credentials_stub().username
          });
      });

      it('should call gateway.create', async () => {
        expect(auth_repository.create).toHaveBeenCalled();
      });
    });
  });
});
