import { Test } from '@nestjs/testing';
import MongoDBAuthRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository.adapter';
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens';
import MongoDBAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import createdAccountDTOStub from '@test/unit/utils/stubs/created_account.dto.stub';
import { FilterQuery } from 'mongoose';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import MongoDBAuthRepositoryMock from '@test/unit/utils/mocks/mongodb_auth.repository.mock';
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';
import createdAccountModelStub from '@test/unit/utils/stubs/created_account.model.stub';

describe('MongoDBAuthRepositoryAdapter', () => {
  let auth_repository_adapter: MongoDBAuthRepositoryAdapter;
  let auth_repository: MongoDBAuthRepository;
  let account_query_model: AccountQueryModel;
  let account_filter_query: FilterQuery<Account>;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        MongoDBAuthRepositoryAdapter,
        {
          provide: MongoDBDITokens.AuthRepository,
          useClass: MongoDBAuthRepositoryMock
        }
      ]
    }).compile();

    auth_repository_adapter = module_ref.get<MongoDBAuthRepositoryAdapter>(MongoDBAuthRepositoryAdapter);
    auth_repository = module_ref.get<MongoDBAuthRepository>(MongoDBDITokens.AuthRepository);
    account_query_model = {
      username: createdAccountDTOStub().username
    };
    account_filter_query = {
      acc_username: account_query_model.username
    };

    jest.clearAllMocks();
  });

  describe('exists', () => {
    describe('when exists is called', () => {
      let exists_account = false;

      beforeEach(async () => {
        exists_account = await auth_repository_adapter.exists(account_query_model);
      });

      it('should call repository.findOne', () => {
        expect(auth_repository.findOne).toHaveBeenCalledWith(account_filter_query);
      });

      it('should return true', () => {
        expect(exists_account).toEqual(true);
      });
    });
  });

  describe('create', () => {
    describe('when repository.create is called', () => {
      let account_dto: AccountDTO;

      beforeEach(async () => {
        account_dto = await auth_repository_adapter.create(createdAccountDTOStub());
      });

      it('should call repository.create', () => {
        expect(auth_repository.create).toHaveBeenCalledWith(createdAccountModelStub());
      });

      it('should return account_dto', () => {
        expect(account_dto).toEqual(createdAccountDTOStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let account_dto: AccountDTO;

      beforeEach(async () => {
        account_dto = await auth_repository_adapter.findOne(account_query_model);
      });

      it('should call repository.findOne', () => {
        expect(auth_repository.findOne).toHaveBeenCalledWith(account_filter_query);
      });

      it('should return account dto', () => {
        expect(account_dto).toEqual(createdAccountDTOStub());
      });
    });
  });
});
