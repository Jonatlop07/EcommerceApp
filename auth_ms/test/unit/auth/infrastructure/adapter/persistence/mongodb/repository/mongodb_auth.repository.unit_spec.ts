import { Test } from '@nestjs/testing';
import MongoDBAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';
import { getModelToken } from '@nestjs/mongoose';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import MongoDBAccountModelMock from '@test/unit/utils/mocks/mongodb_account.model.mock';
import { FilterQuery } from 'mongoose';
import createdAccountDTOStub from '@test/unit/utils/stubs/created_account.dto.stub';
import createdAccountModelStub from '@test/unit/utils/stubs/created_account.model.stub';
import CreateAccountDataMapper
  from '@infrastructure/adapter/persistence/mongodb/entity/mapper/create_account_data.mapper';
import CreateAccountDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_account_document.dto';

describe('MongoDBAuthRepository', () => {
  let mongodb_auth_repository: MongoDBAuthRepository;
  let account_model: MongoDBAccountModelMock;
  let account_filter_query: FilterQuery<Account>;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        MongoDBAuthRepository,
        {
          provide: getModelToken(Account.name),
          useClass: MongoDBAccountModelMock
        }
      ]
    }).compile();

    mongodb_auth_repository = module_ref.get<MongoDBAuthRepository>(MongoDBAuthRepository);
    account_model = module_ref.get<MongoDBAccountModelMock>(getModelToken(Account.name));
    account_filter_query = {
      acc_username: createdAccountDTOStub().username
    };

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let account: Account;

      beforeEach(async () => {
        jest.spyOn(account_model, 'findOne');
        account = await mongodb_auth_repository.findOne(account_filter_query);
      });

      it('should call account_model', () => {
        expect(account_model.findOne).toHaveBeenCalledWith(account_filter_query, {
          _id: 0,
          __v: 0
        });
      });

      it('should return a user', () => {
        expect(account).toEqual(createdAccountModelStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let account: Account;
      let create_spy: jest.SpyInstance;
      let create_account_document_dto: CreateAccountDocumentDTO = CreateAccountDataMapper
        .toDocumentDTO(
          createdAccountDTOStub()
        );

      beforeEach(async () => {
        create_spy = jest.spyOn(MongoDBAccountModelMock.prototype, 'create');
        account = await mongodb_auth_repository.create(create_account_document_dto);
      });

      it('should call account_model', () => {
        expect(create_spy).toHaveBeenCalledWith(create_account_document_dto);
      });

      it('should return a user', () => {
        expect(account).toEqual(createdAccountModelStub());
      });
    });
  });
});
