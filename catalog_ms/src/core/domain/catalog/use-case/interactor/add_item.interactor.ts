import { Interactor } from '@core/common/use-case/interactor'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model'

export default interface AddItemInteractor extends Interactor<AddItemInputModel, AddItemOutputModel> {}
