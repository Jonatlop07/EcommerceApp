import { Test } from '@nestjs/testing';
import AuthController from '@application/api/http-rest/controller/auth.controller';
import SignUpServiceMock from '@test/unit/utils/mocks/sign_up.service.mock';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import { sign_up_credentials_stub } from '@test/unit/utils/stubs/sign_up_credentials.stub';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import ValidateCredentialsInteractor from '@core/domain/auth/use-case/interactor/validate_credentials.interactor';
import ValidateCredentialsServiceMock from '@test/unit/utils/mocks/validate_credentials.service.mock';

describe('AuthController', () => {
  let auth_controller: AuthController;
  let sign_up_interactor: SignUpInteractor;
  let validate_credentials_interactor: ValidateCredentialsInteractor;
  let validate_credentials_output: any;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthDITokens.SignUpInteractor,
          useClass: SignUpServiceMock
        },
        {
          provide: AuthDITokens.ValidateCredentialsInteractor,
          useClass: ValidateCredentialsServiceMock
        }
      ]
    }).compile();

    auth_controller = module_ref.get<AuthController>(AuthController);
    sign_up_interactor = module_ref.get<SignUpInteractor>(AuthDITokens.SignUpInteractor);
    validate_credentials_interactor = module_ref.get<ValidateCredentialsInteractor>(AuthDITokens.ValidateCredentialsInteractor);

    jest.clearAllMocks();
  });

  describe('sign up user', () => {
    describe('when signUp is called', () => {
      beforeEach(async () => {
        await auth_controller.signUp(sign_up_credentials_stub())
      });

      it('should call sign_up_interactor', () => {
        expect(sign_up_interactor.execute).toBeCalledWith(sign_up_credentials_stub());
      });
    });
  });

  describe('validate login credentials', () => {
    describe('when validateCredentials is called', () => {
      beforeEach(async () => {
        validate_credentials_output = await auth_controller.validateCredentials(sign_up_credentials_stub())
      });

      it('should call validate_credentials_interactor', () => {
        expect(validate_credentials_interactor.execute).toBeCalledWith(sign_up_credentials_stub());
      });

      it('should return a response with the property "are_credentials_valid"', () => {
        expect(validate_credentials_output).toHaveProperty('are_credentials_valid');
      });
    });
  });
});
