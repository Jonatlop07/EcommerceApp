import { Test } from '@nestjs/testing';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import SignUpService from '@core/service/auth/sign_up.service';
import { AuthInMemoryRepository } from '@infrastructure/adapter/persistence/in-memory/auth_in_memory.repository';
import ValidateCredentialsService from '@core/service/auth/validate_credentials.service';

export function createTestModule() {
  return Test.createTestingModule({
    providers: [
      {
        provide: AuthDITokens.AuthRepository,
        useFactory: () => new AuthInMemoryRepository(new Map()),
      },
      {
        provide: AuthDITokens.SignUpInteractor,
        useFactory: (gateway) => new SignUpService(gateway),
        inject: [AuthDITokens.AuthRepository]
      },
      {
        provide: AuthDITokens.ValidateCredentialsInteractor,
        useFactory: (gateway) => new ValidateCredentialsService(gateway),
        inject: [AuthDITokens.AuthRepository]
      }
    ]
  }).compile();
}
