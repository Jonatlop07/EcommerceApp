import { Interactor } from '@core/abstraction/use-case/interactor';
import AddItemsToCartInputModel from '@core/application/add-item-to-cart/add_items_to_cart.input_model';
import AddItemsToCartOutputModel from '@core/application/add-item-to-cart/add_items_to_cart.output_model';

export default interface AddItemsToCartInteractor
  extends Interactor<AddItemsToCartInputModel, AddItemsToCartOutputModel> {}
