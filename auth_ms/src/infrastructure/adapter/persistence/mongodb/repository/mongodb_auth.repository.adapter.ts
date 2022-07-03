import AuthRepository from '@core/domain/auth/use-case/repository/auth.repository';
import { AccountDTO } from '@core/domain/auth/dto/account.dto';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import MongodbAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';
import { Logger } from '@nestjs/common';

export default class MongoDBAuthRepositoryAdapter implements AuthRepository {
  private readonly logger: Logger = new Logger(MongoDBAuthRepositoryAdapter.name);

  constructor(
    private readonly repository: MongodbAuthRepository
  ) {}

  public async create(c: AccountDTO): Promise<AccountDTO> {
    return Promise.resolve(undefined);
  }

  public async exists(params: AccountQueryModel): Promise<boolean> {
    return Promise.resolve(false);
  }
}
