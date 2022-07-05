import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import HttpSignUpDTO from '@application/api/http-rest/dto/http_sign_up.dto';
import SignUpInputMapper from '@application/api/http-rest/mapper/sign_up_input.mapper';
import ValidateCredentialsInputMapper from '@application/api/http-rest/mapper/validate_credentials_input.mapper';
import HttpValidateCredentialsDTO from '@application/api/http-rest/dto/http_validate_credentials.dto';
import ValidateCredentialsInteractor from '@core/domain/auth/use-case/interactor/validate_credentials.interactor';
import ValidateCredentialsResponse from '@application/api/http-rest/response/validate_credentials.response';

@Controller('auth')
@ApiTags('authentication')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export default class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    @Inject(AuthDITokens.SignUpInteractor)
    private readonly sign_up_interactor: SignUpInteractor,
    @Inject(AuthDITokens.ValidateCredentialsInteractor)
    private readonly validate_credentials_interactor: ValidateCredentialsInteractor
  ) {}

  @Post('account')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Account successfully created'
  })
  async signUp(@Body() credentials: HttpSignUpDTO): Promise<void> {
    await this.sign_up_interactor.execute(SignUpInputMapper.toInputModel(credentials));
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Credentials successfully validated'
  })
  async validateCredentials(@Body() credentials: HttpValidateCredentialsDTO): Promise<ValidateCredentialsResponse> {
    const { are_credentials_valid } = await this.validate_credentials_interactor.execute(
      ValidateCredentialsInputMapper.toInputModel(credentials)
    );
    return {
      are_credentials_valid
    };
  }
}
