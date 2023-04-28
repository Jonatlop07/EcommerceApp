import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { CoreException } from '@core/abstraction/exception/core.exception';
import CartDITokens from '@core/domain/di/cart_di_tokens';
import { createTestModule } from '@test/bdd-functional/utils/create_test_module';
import { Code } from '@core/abstraction/code/code';
import AddItemsToCartInteractor from '@core/application/add-item-to-cart/add_items_to_cart.interactor';
import AddItemsToCartInputModel from '@core/application/add-item-to-cart/add_items_to_cart.input_model';
import AddItemsToCartOutputModel from '@core/application/add-item-to-cart/add_items_to_cart.output_model';

const feature = loadFeature(
  'test/bdd-functional/cart/features/add_items_to_cart.feature',
);

defineFeature(feature, (test) => {
  let add_items_to_cart_interactor: AddItemsToCartInteractor;
  let input: AddItemsToCartInputModel;
  let output: AddItemsToCartOutputModel;

  let exception: CoreException<never>;

  async function addItemsToCart(
    input: AddItemsToCartInputModel,
  ): Promise<void> {
    try {
      output = await add_items_to_cart_interactor.execute(input);
    } catch (e) {
      exception = e;
    }
  }

  function whenUserTriesToAddItemsToCart(when: DefineStepFunction): void {
    when('the user tries to add the items to the cart', async () => {
      await addItemsToCart(input);
    });
  }

  beforeEach(async () => {
    const module = await createTestModule();
    add_items_to_cart_interactor = module.get<AddItemsToCartInteractor>(
      CartDITokens.AddItemsToCartInteractor,
    );
    output = undefined;
    exception = undefined;
  });

  test('A user adds items to the cart', ({ given, when, then }) => {
    given(
      /^the user provides the items to be added:$/,
      (items: Array<string>) => {
        input = {
          items,
        };
      },
    );
    whenUserTriesToAddItemsToCart(when);
    then('the items are added to the cart', () => {
      expect(output).toBeDefined();
    });
  });

  test('A user tries to add an empty list of items to the cart', ({
    given,
    when,
    then,
  }) => {
    given(/^the user provides an empty list of items to be added$/, () => {
      input = {
        items: [],
      };
    });
    whenUserTriesToAddItemsToCart(when);
    then('error: there are no items to be added', () => {
      expect(exception).toBeDefined();
      expect(exception).toBeInstanceOf(CoreException);
      expect(exception.code).toEqual(Code.BAD_REQUEST_ERROR);
    });
  });
});
