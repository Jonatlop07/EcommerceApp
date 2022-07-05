import { IsBoolean } from 'class-validator';

export default class ValidateCredentialsResponse {
  @IsBoolean()
  are_credentials_valid: boolean;
}
