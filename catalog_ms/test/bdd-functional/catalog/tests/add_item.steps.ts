import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { CoreException } from '@core/common/exception/core.exception';
import { Optional } from '@core/common/type/common_types';
import { createTestModule } from '@test/bdd-functional/utils/create_test_module';
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model';
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model';
import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor';
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens';
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto';

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
      /^the details are: "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)"$/,
      (vendor_id: string, name: string, description: string, media_uris_string: string) => {
        input = {
          vendor_id,
          name,
          description,
          media_uris: media_uris_string.split(';')
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
          const expected_catalog_item: CatalogItemDTO = {
            item_id: '',
            vendor_id: input.vendor_id,
            name:input.name,
            description: input.description,
            media_uris: ['a', 'b'],
            created_at: null,
            updated_at: null
          };
          expect(output.created_item).toBeDefined();
          expect(output.created_item).toHaveProperty('vendor_id', expected_catalog_item.vendor_id);
          expect(output.created_item).toHaveProperty('name', expected_catalog_item.name);
          expect(output.created_item).toHaveProperty('description', expected_catalog_item.description);
          expect(output.created_item).toHaveProperty('media_uris', expected_catalog_item.media_uris);
        }
      );
    }
  );
});
