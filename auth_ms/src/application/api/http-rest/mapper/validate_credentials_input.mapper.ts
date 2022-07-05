import HttpValidateCredentialsDTO from '@application/api/http-rest/dto/http_validate_credentials.dto';
import ValidateCredentialsInputModel from '@core/domain/auth/use-case/input-model/validate_credentials.input_model';

export default class ValidateCredentialsInputMapper {
  public static toInputModel(dto: HttpValidateCredentialsDTO): ValidateCredentialsInputModel {
    return {
      username: dto.username,
      password: dto.password
    }
  }
}
