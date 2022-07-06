import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'

export default class AddItemService implements AddItemInteractor {
  public async execute(input: AddItemInputModel): Promise<AddItemOutputModel> {
    return Promise.resolve({});
  }
}
