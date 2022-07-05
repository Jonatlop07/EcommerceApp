import ValidateCredentialsInteractor from '@core/domain/auth/use-case/interactor/validate_credentials.interactor';
import ValidateCredentialsInputModel from '@core/domain/auth/use-case/input-model/validate_credentials.input_model';
import ValidateCredentialsOutputModel from '@core/domain/auth/use-case/output-model/validate_credentials.output_model';
import { Inject, Logger } from '@nestjs/common';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import ValidateCredentialsGateway from '@core/domain/auth/use-case/gateway/validate_credentials.gateway';

export default class ValidateCredentialsService implements ValidateCredentialsInteractor {
  private readonly logger: Logger = new Logger(ValidateCredentialsService.name);

  constructor(
    @Inject(AuthDITokens.AuthRepository)
    private readonly gateway: ValidateCredentialsGateway
  ) {}

  public async execute(input: ValidateCredentialsInputModel): Promise<ValidateCredentialsOutputModel> {
    return Promise.resolve(undefined);
  }
}
