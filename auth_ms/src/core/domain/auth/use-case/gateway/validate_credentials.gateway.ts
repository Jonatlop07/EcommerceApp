import FindOne from '@core/common/persistence/find_one';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto';

export default interface ValidateCredentialsGateway extends FindOne<AccountQueryModel, AccountDTO> {}
