import { AccountDTO } from '@core/domain/auth/dto/account.dto';
import { toMomentString } from '@core/common/util/time/date_utils';
import AccountDocument from '@infrastructure/adapter/persistence/mongodb/entity/account.document';

export default class AccountMapper {
  public static toDTO(account: AccountDocument): AccountDTO {
    return {
      account_id: account._id,
      username: account.acc_username,
      password: account.acc_password,
      access_token: account.acc_auth_token,
      created_at: toMomentString(account.acc_created_at)
    };
  }
}
