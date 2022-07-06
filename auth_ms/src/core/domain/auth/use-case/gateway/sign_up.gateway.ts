import Create from '@core/common/persistence/create';
import Exists from '@core/common/persistence/exists';
import AccountQueryModel from '@core/domain/auth/use-case/query-model/account.query_model';
import { AccountDTO } from '@core/domain/auth/use-case/dto/account.dto'

export default interface SignUpGateway extends Create<AccountDTO, AccountDTO>, Exists<AccountQueryModel> {}
