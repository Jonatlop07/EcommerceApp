import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import { createTestModule } from '@test/bdd-functional/utils/create_test_module';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model';
import SignUpOutputModel from '@core/domain/auth/use-case/output-model/sign_up.output_model';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import { CoreException } from '@core/common/exception/core.exception';
import { Code } from '@core/common/code/code';
import { Optional } from '@core/common/type/common_types'

const feature = loadFeature('test/bdd-functional/auth/features/sign_up.feature');

defineFeature(feature, (test) => {
  let sign_up_interactor: SignUpInteractor;
  let input: SignUpInputModel;
  let output: SignUpOutputModel;

  let exception: CoreException<Optional<any>>;

  async function signUp(input: SignUpInputModel) {
    try {
      output = await sign_up_interactor.execute(input);
    } catch (e) {
      exception = e;
    }
  }

  function givenUserProvidesCredentials(given: DefineStepFunction) {
    given(
      /^the user provides the credentials: "([^"]*)" and "([^"]*)"$/,
      (input_username: string, input_password: string) => {
        input = {
          username: input_username,
          password: input_password
        }
      },
    );
  }

  function andUserExistsWithUsername(and: DefineStepFunction) {
    and('there already exists a user with the username provided', async () => {
      await signUp(input);
    });
  }

  function whenUserTriesToSignUp(when: DefineStepFunction) {
    when('the user tries to sign up', async () => {
      await signUp(input);
    });
  }

  beforeEach(async () => {
    const module = await createTestModule();
    sign_up_interactor = module.get<SignUpInteractor>(AuthDITokens.SignUpInteractor);
    output = undefined;
    exception = undefined;
  });

  test('A user tries to create an account with credentials in a valid format',
    ({ given, when, then }) => {
      givenUserProvidesCredentials(given);
      whenUserTriesToSignUp(when);
      then(
        'their account is successfully created and the user can log into it',
        () => {
          expect(output).toBeDefined();
        }
      );
    }
  );

  test('A user attempts to create an account with the credentials in an invalid format',
    ({ given, when, then }) => {
      givenUserProvidesCredentials(given);
      whenUserTriesToSignUp(when);
      then(
        'an error occurs: the credentials provided by the user are in an invalid format',
        () => {
          expect(exception).toBeDefined();
          expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        }
      );
    }
  );

  test('A user fails to create an account because the username they provide is already in use',
    ({ given, and, when, then }) => {
      givenUserProvidesCredentials(given);
      andUserExistsWithUsername(and);
      whenUserTriesToSignUp(when);
      then(
        'an error occurs: the username is already in use',
        () => {
          expect(exception).toBeDefined();
          expect(exception.code).toBe(Code.ENTITY_ALREADY_EXISTS_ERROR.code);
        }
      );
    }
  );
});
