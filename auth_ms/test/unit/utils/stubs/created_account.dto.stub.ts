import { AccountDTO } from '@core/domain/auth/dto/account.dto';
import { getCurrentDateString } from '@core/common/util/time/moment_utils';

const created_account_dto_stub = (): AccountDTO => ({
  account_id: 'b0e4692f-47fa-4591-a295-a93f83587e39',
  username: 'new_account',
  password: 'Abc123_tr',
  access_token: null,
  created_at: getCurrentDateString()
});

export default created_account_dto_stub;
