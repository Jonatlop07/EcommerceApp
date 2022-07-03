import { Logger } from '@nestjs/common';
import { EntityRepository } from '@infrastructure/adapter/persistence/mongodb/repository/entity.repository';
import AccountDocument from '@infrastructure/adapter/persistence/mongodb/entity/account.document';
import { InjectModel } from '@nestjs/mongoose';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import { Model } from 'mongoose';

export default class MongodbAuthRepository extends EntityRepository<AccountDocument> {
  private readonly logger: Logger = new Logger(MongodbAuthRepository.name);

  constructor(
    @InjectModel(Account.name)
    private readonly account_model: Model<AccountDocument>
  ) {
    super(account_model);
  }
}
