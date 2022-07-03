import HttpSignUpDTO from '@application/api/http-rest/dto/http_sign_up.dto';
import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model';

export default class SignUpInputMapper {
  public static toInputModel(sign_up_dto: HttpSignUpDTO): SignUpInputModel {
    return {
      username: sign_up_dto.username,
      password: sign_up_dto.password
    }
  }
}
