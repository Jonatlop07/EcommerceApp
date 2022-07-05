import { Entity } from '@core/common/entity/entity'
import { Id, Nullable } from '@core/common/type/common_types'
import { IsOptional, IsString } from 'class-validator'
import { CreateAccountEntityPayload } from '@core/domain/auth/entity/type/create_account_entity_payload'
import { CoreAssert } from '@core/common/util/assert/core_assert'
import { Code } from '@core/common/code/code'
import { CoreException } from '@core/common/exception/core.exception'
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto'
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

export default class Account extends Entity<Id> {
  @IsString()
  private readonly username: string;

  @IsString()
  private password: string;

  @IsOptional()
  @IsString()
  private readonly created_at: Nullable<string>;

  constructor(payload: CreateAccountEntityPayload) {
    super();
    this._id = payload.account_id || v4();
    this.username = payload.username;
    CoreAssert.isTrue(
      this.hasValidUsernameFormat(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'Account: Invalid username format'
      })
    );
    this.password = payload.password;
    CoreAssert.isTrue(
      this.hasValidPasswordFormat(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'Account: Invalid password format'
      })
    );
    this.created_at = payload.created_at || null;
  }

  private hasValidUsernameFormat(): boolean {
    return this.username.trim() !== '' && this.username.trim().length > 3;
  }

  private hasValidPasswordFormat(): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~_]).{8,}$/
      .test(this.password);
  }

  private async hashPassword(): Promise<void> {
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    await this.validate();
  }

  public static async new(payload: CreateAccountEntityPayload): Promise<Account> {
    const account: Account = new Account(payload);
    await account.hashPassword();
    await account.validate();
    return account;
  }

  public toDTO(): AccountDTO {
    return {
      account_id: this.id,
      username: this.username,
      password: this.password,
      access_token: null,
      created_at: this.created_at
    }
  }
}
