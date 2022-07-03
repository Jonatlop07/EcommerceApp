import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import createdAccountModelStub from '@test/unit/utils/stubs/created_account.model.stub';
import MongoDBModelMock from '@test/unit/utils/mocks/mongodb.model.mock';

export default class MongoDBAccountModelMock extends MongoDBModelMock<Account> {
  protected entity_stub: Account = createdAccountModelStub();
}
