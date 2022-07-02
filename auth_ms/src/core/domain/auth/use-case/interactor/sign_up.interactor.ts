import { Interactor } from '@core/common/use-case/interactor'
import SignUpInputModel from '@core/domain/auth/use-case/input-model/sign_up.input_model'
import SignUpOutputModel from '@core/domain/auth/use-case/input-model/sign_up.output_model'

export default interface SignUpInteractor extends Interactor<SignUpInputModel, SignUpOutputModel> {}
