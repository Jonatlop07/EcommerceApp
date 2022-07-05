import Account from '@core/domain/auth/entity/account'
import { CoreException } from '@core/common/exception/core.exception'
import { Code } from '@core/common/code/code'

describe('Account entity', () => {
  const valid_username = 'new_user';
  const valid_password = 'Abc123_tr';

  const invalid_username_error_message = 'Account: Invalid username format';
  const invalid_password_error_message = 'Account: Invalid password format';

  it('should throw when the username format is invalid', async ()=> {
    const invalid_usernames = ['', ' ', 'n', 'new'];
    expect.assertions(3 * invalid_usernames.length);

    for (const username of invalid_usernames) {
      try {
        await Account.new({
          username,
          password: valid_password
        });
      } catch (error) {
        expect(error).toBeInstanceOf(CoreException);
        expect(error).toHaveProperty('code', Code.ENTITY_VALIDATION_ERROR.code);
        expect(error).toHaveProperty('message', invalid_username_error_message);
      }
    }
  });

  it('should throw when the password format is invalid', async ()=> {
    const invalid_passwords = ['', ' ', 'Ab12_', 'Abcdefghi'];
    expect.assertions(3 * invalid_passwords.length);

    for (const password of invalid_passwords) {
      try {
        await Account.new({
          username: valid_username,
          password
        });
      } catch (error) {
        expect(error).toBeInstanceOf(CoreException);
        expect(error).toHaveProperty('code', Code.ENTITY_VALIDATION_ERROR.code);
        expect(error).toHaveProperty('message', invalid_password_error_message);
      }
    }
  });

  it('should not throw when the formats of credentials are valid', async () => {
    const account = await Account.new({
      username: valid_username,
      password: valid_password
    });
    expect(account).toBeDefined();
  });

  it('should return true when passwords match', async () => {
    const account = await Account.new({
      username: valid_username,
      password: valid_password
    });
    expect(await account.passwordMatches(valid_password)).toEqual(true);
  });

  it('should return false when passwords do not match', async () => {
    const account = await Account.new({
      username: valid_username,
      password: valid_password
    });
    expect(await account.passwordMatches(`${valid_password}_`)).toEqual(false);
  });
});
