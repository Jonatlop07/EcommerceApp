import AddItemsToCartInteractor from '@core/application/add-item-to-cart/add_items_to_cart.interactor';
import AddItemsToCartInputModel from '@core/application/add-item-to-cart/add_items_to_cart.input_model';
import AddItemsToCartOutputModel from '@core/application/add-item-to-cart/add_items_to_cart.output_model';

export default class AddItemsToCartService implements AddItemsToCartInteractor {
  public async execute(
    input: AddItemsToCartInputModel,
  ): Promise<AddItemsToCartOutputModel> {
    return Promise.resolve(undefined);
  }
}
