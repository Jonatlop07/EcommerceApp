import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';
import CreateAccountDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_account_document.dto';
import { toDate } from '@core/common/util/time/date_utils';

export default class CreateAccountDataMapper {
  public static toDocumentDTO(dto: AccountDTO): CreateAccountDocumentDTO {
    return {
      acc_username: dto.username,
      acc_password: dto.password,
      acc_auth_token: dto.access_token,
      acc_created_at: toDate(dto.created_at)
    };
  }
}
