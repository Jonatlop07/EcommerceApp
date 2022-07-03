import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';

const createdAccountModelStub = (): Account => ({
  acc_username: 'new_account',
  acc_password: 'Abc123_tr',
  acc_auth_token: null,
  acc_created_at: new Date('2022/03/22')
});

export default createdAccountModelStub;
