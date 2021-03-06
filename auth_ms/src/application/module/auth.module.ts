import { Module, Provider } from '@nestjs/common';
import AuthController from '@application/api/http-rest/controller/auth.controller';
import AuthDITokens from '@core/domain/auth/di/auth_di_tokens';
import SignUpService from '@core/service/auth/sign_up.service';
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens';
import MongoDBAuthRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository.adapter';
import MongoDBAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';
import ValidateCredentialsService from '@core/service/auth/validate_credentials.service';

const persistence_providers: Array<Provider> = [
  {
    provide: MongoDBDITokens.AuthRepositoryAdapter,
    useClass: MongoDBAuthRepository
  },
  {
    provide: AuthDITokens.AuthRepository,
    useFactory: (repository) => new MongoDBAuthRepositoryAdapter(repository),
    inject: [MongoDBDITokens.AuthRepositoryAdapter]
  }
];

const use_case_providers: Array<Provider> = [
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
];

@Module({
  controllers: [AuthController],
  providers: [...persistence_providers, ...use_case_providers]
})
export default class AuthModule {}
