import ValidateCredentialsInteractor from '@core/domain/auth/use-case/interactor/validate_credentials.interactor';
import ValidateCredentialsInputModel from '@core/domain/auth/use-case/input-model/validate_credentials.input_model';
import ValidateCredentialsOutputModel from '@core/domain/auth/use-case/output-model/validate_credentials.output_model';
import { Inject, Logger } from '@nestjs/common';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import ValidateCredentialsGateway from '@core/domain/auth/use-case/gateway/validate_credentials.gateway';
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';
import Account from '@core/domain/auth/entity/account';
import { CoreAssert } from '@core/common/util/assert/core_assert';
import { CoreException } from '@core/common/exception/core.exception';
import { Code } from '@core/common/code/code';

export default class ValidateCredentialsService implements ValidateCredentialsInteractor {
  private readonly logger: Logger = new Logger(ValidateCredentialsService.name);

  constructor(
    @Inject(AuthDITokens.AuthRepository)
    private readonly gateway: ValidateCredentialsGateway
  ) {}

  public async execute(input: ValidateCredentialsInputModel): Promise<ValidateCredentialsOutputModel> {
    const { username, password } = input;
    const invalid_credentials_output: ValidateCredentialsOutputModel = {
      are_credentials_valid: false
    };
    const account_dto: AccountDTO = await this.gateway.findOne({
      username
    });
    if (!account_dto) {
      return invalid_credentials_output;
    }
    const account = await Account.fromDTO(account_dto);
    if (!await account.passwordMatches(password)) {
      return invalid_credentials_output;
    }
    return {
      are_credentials_valid: true
    };
  }
}
