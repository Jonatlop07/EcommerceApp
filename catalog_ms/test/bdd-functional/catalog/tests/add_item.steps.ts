import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { CoreException } from '@core/common/exception/core.exception';
import { Optional } from '@core/common/type/common_types';
import { createTestModule } from '@test/bdd-functional/utils/create_test_module';
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model';
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model';
import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor';
import CatalogDITokens from '@core/domain/catalog/use-case/dto/catalog_di_tokens'
import { Code } from '@core/common/code/code'

const feature = loadFeature('test/bdd-functional/catalog/features/add_item.feature');

defineFeature(feature, (test) => {
  let add_item_interactor: AddItemInteractor;
  let input: AddItemInputModel;
  let output: AddItemOutputModel;

  let exception: CoreException<Optional<any>>;

  async function addItem(input: AddItemInputModel) {
    try {
      output = await add_item_interactor.execute(input);
    } catch (e) {
      exception = e;
    }
  }

  function givenUserProvidesItemDetails(given: DefineStepFunction) {
    given('a user wants to provide the details of the item to add', () => {});
  }

  function andDetailsProvidedAre(and: DefineStepFunction) {
    and(
      /^the details are: "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)"$/,
      ({ vendor_id, name, description, price, units_available }) => {
        input = {
          vendor_id,
          name,
          description,
          price,
          units_available
        };
      }
    );
  }

  function whenUserTriesToAddItem(when: DefineStepFunction) {
    when(
      'the user tries to add the item',
      async () => {
        await addItem(input);
      }
    );
  }

  beforeEach(async () => {
    const module = await createTestModule();
    add_item_interactor = module.get<AddItemInteractor>(CatalogDITokens.AddItemInteractor);
    output = undefined;
    exception = undefined;
  });

  test(
    'A user adds an item to the catalog',
    ({ given, and, when, then }) => {
      givenUserProvidesItemDetails(given);
      andDetailsProvidedAre(and);
      whenUserTriesToAddItem(when);
      then(
        'the item is successfully added to the catalog',
        () => {
          expect(output).toBeDefined();
        }
      );
    }
  );

  test(
    'A user tries to add an item with invalid details to the catalog',
    ({ given, and, when, then }) => {
      givenUserProvidesItemDetails(given);
      andDetailsProvidedAre(and);
      whenUserTriesToAddItem(when);
      then(
        'an error occurs: the item\'s details are invalid',
        () => {
          expect(exception).toBeDefined();
          expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        }
      );
    }
  );
});
