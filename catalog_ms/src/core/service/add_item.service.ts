import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'
import CatalogItem from '@core/domain/catalog/entity/catalog_item'

export default class AddItemService implements AddItemInteractor {
  public async execute(input: AddItemInputModel): Promise<AddItemOutputModel> {
    const catalog_item = await CatalogItem.new({
      vendor_id: input.vendor_id,
      name: input.name,
      description: input.description,
      price: input.price,
      units_available: input.units_available
    });
    return {
      created_item: catalog_item.toDTO()
    };
  }
}
