import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';

const createdAccountDTOStub = (): AccountDTO => ({
  account_id: undefined,
  username: 'new_account',
  password: 'Abc123_tr',
  access_token: null,
  created_at: '2022/03/22 11:54:02'
});

export default createdAccountDTOStub;
