import { Test, TestingModule } from '@nestjs/testing';
import CartDITokens from '@core/domain/di/cart_di_tokens';
import AddItemsToCartService from '@core/application/add-item-to-cart/add_items_to_cart.service';

export function createTestModule(): Promise<TestingModule> {
  return Test.createTestingModule({
    providers: [
      {
        provide: CartDITokens.AddItemsToCartInteractor,
        useFactory: () => new AddItemsToCartService(),
      },
    ],
  }).compile();
}
