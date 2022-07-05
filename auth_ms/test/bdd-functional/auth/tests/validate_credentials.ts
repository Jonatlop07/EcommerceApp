import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import { CoreException } from '@core/common/exception/core.exception';
import { Optional } from '@core/common/type/common_types';
import { createTestModule } from '@test/bdd-functional/utils/create_test_module';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import { Code } from '@core/common/code/code';

const feature = loadFeature('test/bdd-functional/auth/features/validate_credentials.feature');

defineFeature(feature, (test) => {
  let sign_up_interactor: SignUpInteractor;

  let validate_credentials_interactor: ValidateCredentialsInteractor;
  let validate_credentials_input: ValidateCredentialsInputModel;
  let validate_credentials_output: ValidateCredentialsOutput;

  let exception: CoreException<Optional<any>>;

  async function signUp(input: SignUpInputModel) {
    await sign_up_interactor.execute(input);
  }

  async function validateCredentials(input: ValidateCredentialsInputModel) {
    try {
      validate_credentials_output = await validate_credentials_interactor.execute(input);
    } catch (e) {
      exception = e;
    }
  }

  function givenUserProvidesCredentials(given: DefineStepFunction) {
    given(
      /^the user provides the credentials: "([^"]*)" and "([^"]*)"$/,
      (username: string, password: string) => {
        validate_credentials_input = {
          username,
          password
        };
      },
    );
  }

  function andAccountExists(and: DefineStepFunction) {
    and('an account exists with those credentials',
      async () => await signUp(validate_credentials_input as SignUpInputModel)
    );
  }

  function whenUserTriesLogIn(when: DefineStepFunction) {
    when('the user tries to login', async () => {
      try {
        validate_credentials_output = await validate_credentials_interactor.execute(validate_credentials_input);
      } catch (e) {
        exception = e;
      }
    });
  }

  beforeEach(async () => {
    const module = await createTestModule();
    sign_up_interactor = module.get<SignUpInteractor>(AuthDITokens.SignUpInteractor);
    validate_credentials_interactor = module.get<ValidateCredentialsInteractor>(AuthDITokens.ValidateCredentialsInteractor);
    validate_credentials_output = undefined;
    exception = undefined;
  });

  test('A user tries to login with credentials in a valid format',
    ({ given, and, when, then }) => {
      givenUserProvidesCredentials(given);
      andAccountExists(and);
      whenUserTriesLogIn(when);
      then('the credentials are in a valid format and match an existing account', () => {
        expect(validate_credentials_output.are_valid_credentials).toEqual(true);
      });
    }
  );

  test('A user tries to login with credentials in an invalid format',
    ({ given, and, when, then }) => {
      givenUserProvidesCredentials(given);
      andAccountExists(and);
      whenUserTriesLogIn(when);
      then('an error occurs: the format of the credentials is invalid', () => {
        expect(exception).toBeDefined();
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
      });
    }
  );

  test('A user tries to login with credentials that do not match an existing account',
    ({ given, when, then }) => {
      givenUserProvidesCredentials(given);
      whenUserTriesLogIn(when);
      then('the credentials are not valid: an account with the credentials provided does not exist', () => {
        expect(validate_credentials_output.are_valid_credentials).toEqual(false);
      });
    }
  );
});
