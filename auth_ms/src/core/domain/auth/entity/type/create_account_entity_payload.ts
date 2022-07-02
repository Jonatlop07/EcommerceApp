import { Id } from '@core/common/type/common_types'

export type CreateAccountEntityPayload = {
  account_id?: Id;
  username: string,
  password: string,
  created_at?: string,
}
