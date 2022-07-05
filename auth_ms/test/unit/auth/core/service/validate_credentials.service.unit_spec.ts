import ValidateCredentialsService from '@core/service/auth/validate_credentials.service';
import AuthRepository from '@core/domain/auth/use-case/repository/auth.repository';
import { Test } from '@nestjs/testing';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import AuthRepositoryMock from '@test/unit/utils/mocks/auth.repository.mock';
import { sign_up_credentials_stub } from '@test/unit/utils/stubs/sign_up_credentials.stub';
import ValidateCredentialsInputModel from '@core/domain/auth/use-case/input-model/validate_credentials.input_model';

describe('ValidateCredentialsService', () => {
  let validate_credentials_service: ValidateCredentialsService;
  let auth_repository: AuthRepository;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: AuthDITokens.AuthRepository,
          useClass: AuthRepositoryMock
        },
        ValidateCredentialsService
      ]
    }).compile();

    validate_credentials_service = module_ref.get<ValidateCredentialsService>(ValidateCredentialsService);
    auth_repository = module_ref.get<AuthRepository>(AuthDITokens.AuthRepository);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    describe('when execute is called', () => {
      beforeEach(async () => {
        await validate_credentials_service.execute(sign_up_credentials_stub() as ValidateCredentialsInputModel)
      });

      it('should call gateway.findOne', () => {
        expect(auth_repository.findOne)
          .toBeCalledWith({
            username: sign_up_credentials_stub().username
          });
      });
    });
  });
});
