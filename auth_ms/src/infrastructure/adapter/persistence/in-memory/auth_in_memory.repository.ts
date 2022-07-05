import AuthRepository from '@core/domain/auth/use-case/repository/auth.repository';
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import { getCurrentDateString } from '@core/common/util/time/date_utils'
import { Optional } from '@core/common/type/common_types';

export class AuthInMemoryRepository implements AuthRepository {
  private currently_available_account_id: string;

  constructor(public readonly accounts: Map<string, AccountDTO>) {
    this.currently_available_account_id = '1';
  }

  public async create(account: AccountDTO): Promise<AccountDTO> {
    const new_account: AccountDTO = {
      account_id: this.currently_available_account_id,
      username: account.username,
      password: account.password,
      created_at: getCurrentDateString(),
      access_token: null
    };
    this.accounts.set(this.currently_available_account_id, new_account);
    this.currently_available_account_id = `${Number(this.currently_available_account_id) + 1}`;
    return Promise.resolve(new_account);
  }

  public async exists(params: AccountQueryModel): Promise<boolean> {
    for (const _account of this.accounts.values())
      if (_account.username === params.username)
        return Promise.resolve(true);
    return Promise.resolve(false);
  }

  public findOne(params: AccountQueryModel): Promise<Optional<AccountDTO>> {
    for (const account of this.accounts.values()) {
      // @ts-ignore
      if (Object.keys(params).every((key: string) => params[key] === account[key])) {
        return Promise.resolve(account);
      }
    }
    return Promise.resolve(undefined);
  }
}
