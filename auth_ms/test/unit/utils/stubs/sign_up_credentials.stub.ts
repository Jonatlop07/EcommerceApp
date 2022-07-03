import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model';

export const sign_up_credentials_stub = (): SignUpInputModel => ({
  username: 'new_account',
  password: 'Abc123_tr'
});
