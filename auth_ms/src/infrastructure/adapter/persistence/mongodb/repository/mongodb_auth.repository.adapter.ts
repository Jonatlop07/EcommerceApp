import AuthRepository from '@core/domain/auth/use-case/repository/auth.repository';
import { AccountDTO } from '@core/domain/auth/dto/account.dto';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import MongodbAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';
import { Inject, Logger } from '@nestjs/common';
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import CreateAccountDataMapper
  from '@infrastructure/adapter/persistence/mongodb/entity/mapper/create_account_data.mapper';
import AccountMapper from '@infrastructure/adapter/persistence/mongodb/entity/mapper/account.mapper';
import AccountDocument from '@infrastructure/adapter/persistence/mongodb/entity/account.document';

export default class MongoDBAuthRepositoryAdapter implements AuthRepository {
  private readonly logger: Logger = new Logger(MongoDBAuthRepositoryAdapter.name);

  constructor(
    @Inject(MongoDBDITokens.AuthRepository)
    private readonly repository: MongodbAuthRepository
  ) {}

  public async exists(params: AccountQueryModel): Promise<boolean> {
    const account: Account = await this.repository.findOne({
      acc_username: params.username
    });
    return account !== undefined && account !== null;
  }

  public async create(create_account_dto: AccountDTO): Promise<AccountDTO> {
    const account: AccountDocument = await this.repository.create(
      CreateAccountDataMapper.toDocumentDTO(create_account_dto)
    );
    return AccountMapper.toDTO(account);
  }
}
