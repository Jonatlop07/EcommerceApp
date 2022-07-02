import { Id, Nullable } from '@core/common/type/common_types'

export interface AccountDTO {
  account_id: Id,
  username: string;
  password: string;
  access_token: Nullable<string>;
  created_at: Nullable<string>;
}
