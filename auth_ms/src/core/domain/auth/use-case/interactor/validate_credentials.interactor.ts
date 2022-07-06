import ValidateCredentialsInputModel from '@core/domain/auth/use-case/input-model/validate_credentials.input_model';
import ValidateCredentialsOutputModel from '@core/domain/auth/use-case/output-model/validate_credentials.output_model';
import { Interactor } from '@core/common/use-case/interactor';

export default interface ValidateCredentialsInteractor extends Interactor<ValidateCredentialsInputModel, ValidateCredentialsOutputModel> {}
