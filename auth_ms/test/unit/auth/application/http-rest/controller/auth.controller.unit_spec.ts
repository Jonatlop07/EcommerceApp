import { Test } from '@nestjs/testing';
import AuthController from '@application/api/http-rest/controller/auth.controller';
import SignUpServiceMock from '@test/unit/utils/mocks/sign_up.service.mock';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import { sign_up_credentials_stub } from '@test/unit/utils/stubs/sign_up_credentials.stub';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';

describe('AuthController', () => {
  let auth_controller: AuthController;
  let sign_up_interactor: SignUpInteractor;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthDITokens.SignUpInteractor,
          useClass: SignUpServiceMock
        }
      ]
    }).compile();

    auth_controller = module_ref.get<AuthController>(AuthController);
    sign_up_interactor = module_ref.get<SignUpInteractor>(AuthDITokens.SignUpInteractor);

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
});
