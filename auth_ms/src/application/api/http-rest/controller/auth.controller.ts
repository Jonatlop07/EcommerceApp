import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import HttpSignUpDTO from '@application/api/http-rest/dto/http_sign_up.dto';
import SignUpInputMapper from '@application/api/http-rest/mapper/sign_up_input.mapper';

@Controller('auth')
@ApiTags('authentication')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export default class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    @Inject(AuthDITokens.SignUpInteractor)
    private readonly sign_up_interactor: SignUpInteractor
  ) {}

  @Post('account')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Account successfully created'
  })
  async signUp(@Body() credentials: HttpSignUpDTO): Promise<void> {
    await this.sign_up_interactor.execute(SignUpInputMapper.toInputModel(credentials));
  }
}
