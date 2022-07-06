import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor'
import SignUpOutputModel from '@core/domain/auth/use-case/output-model/sign_up.output_model'
import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model'
import { Inject, Logger } from '@nestjs/common'
import Account from '@core/domain/auth/entity/account'
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens'
import SignUpGateway from '@core/domain/auth/use-case/gateway/sign_up.gateway'
import { CoreAssert } from '@core/common/util/assert/core_assert'
import { CoreException } from '@core/common/exception/core.exception'
import { Code } from '@core/common/code/code'

export default class SignUpService implements SignUpInteractor {
  private readonly logger: Logger = new Logger(SignUpService.name);

  constructor(
    @Inject(AuthDITokens.AuthRepository)
    private readonly gateway: SignUpGateway
  ) {}

  public async execute(input: SignUpInputModel): Promise<SignUpOutputModel> {
    const { username, password } = input;
    const new_account = await Account.new({
      username,
      password
    });
    const new_account_dto = new_account.toDTO();
    const exists_account = await this.gateway.exists({ username });
    CoreAssert.isFalse(
      exists_account,
      CoreException.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        override_message: `There already exists a user with username ${username}`
      })
    );
    await this.gateway.create(new_account_dto);
    return Promise.resolve({});
  }
}
