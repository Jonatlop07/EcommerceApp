import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import SignUpInteractor from '@core/domain/auth/use-case/interactor/sign_up.interactor';
import { ValidationPipe } from '@application/api/http/common/pipes/validation.pipe';
import HttpSignUpDTO from '@application/api/http/dto/http_sign_up.dto';

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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Account successfully created'
  })
  async signUp(@Body(new ValidationPipe()) credentials: HttpSignUpDTO): Promise<void> {
    return Promise.resolve();
  }
}
