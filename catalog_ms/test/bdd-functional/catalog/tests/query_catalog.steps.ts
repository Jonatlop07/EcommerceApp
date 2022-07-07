import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor';
import { CoreException } from '@core/common/exception/core.exception'
import { Optional } from '@core/common/type/common_types'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import { createTestModule } from '@test/bdd-functional/utils/create_test_module'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import QueryCatalogInteractor from '@core/domain/catalog/use-case/interactor/query_catalog.interactor'
import QueryCatalogInputModel from '@core/domain/catalog/use-case/input-model/query_catalog.input_model'
import QueryCatalogOutputModel from '@core/domain/catalog/use-case/output-model/query_catalog.output_model'

const feature = loadFeature('test/bdd-functional/catalog/features/query_catalog.feature');

defineFeature(feature, (test) => {
  let add_item_interactor: AddItemInteractor;
  let catalog_items: Array<CatalogItemDTO> = [];

  let query_catalog_interactor: QueryCatalogInteractor;
  let query_catalog_input: QueryCatalogInputModel = {};
  let query_catalog_output: QueryCatalogOutputModel;

  let exception: CoreException<Optional<any>>;

  async function addItem(input: AddItemInputModel) {
    const { created_item } = await add_item_interactor.execute(input);
    return created_item;
  }

  async function queryCatalog(input: QueryCatalogInputModel) {
    try {
      query_catalog_output = await query_catalog_interactor.execute(input);
    } catch (e) {
      exception = e;
    }
  }

  function givenItemsExist(given: DefineStepFunction) {
    given(
      /^these items exists in the catalog:$/,
      async (items_to_create: Array<AddItemInputModel>) => {
        for (const item of items_to_create) {
          catalog_items.push(await addItem({
            ...item,
            price: parseFloat(item.price.toString()),
            units_available: parseInt(item.units_available.toString())
          }));
        }
      }
    );
  }

  function andUserQueriesByName(and: DefineStepFunction) {
    and(
      /^a user wants to query items in the catalog that match the name: "([^"]*)"$/,
      (item_name: string) => {
        query_catalog_input = {
          item_name
        };
      }
    );
  }

  function whenUserQueriesItemCatalog(when: DefineStepFunction) {
    when(
      'the user tries to query item catalog',
      async () => {
        await queryCatalog(query_catalog_input);
      }
    );
  }

  beforeEach(async () => {
    const module = await createTestModule();
    add_item_interactor = module.get<AddItemInteractor>(CatalogDITokens.AddItemInteractor);
    query_catalog_interactor = module.get<QueryCatalogInteractor>(CatalogDITokens.QueryCatalogInteractor);
    catalog_items = [];
    query_catalog_output = undefined;
    exception = undefined;
  });

  test(
    'A user queries item catalog',
    ({ given, when, then }) => {
      givenItemsExist(given);
      whenUserQueriesItemCatalog(when);
      then(/^the following items are retrieved:$/, (created_items: Array<CatalogItemDTO>) => {
        expect(query_catalog_output.items.length).toEqual(created_items.length);

        for (let i = 0; i < query_catalog_output.items.length; ++i) {
          const actual_item = query_catalog_output.items[i];
          const expected_item = created_items[i];
          expect(actual_item).toHaveProperty('vendor_id', expected_item.vendor_id);
          expect(actual_item).toHaveProperty('name', expected_item.name);
          expect(actual_item).toHaveProperty('description', expected_item.description);
          expect(actual_item).toHaveProperty('price', parseFloat(expected_item.price.toString()));
          expect(actual_item).toHaveProperty('units_available', parseInt(expected_item.units_available.toString()));
        }
      });
    }
  );

  test(
    'A user queries item catalog by item name',
    ({ given, and, when, then }) => {
      givenItemsExist(given);
      andUserQueriesByName(and);
      whenUserQueriesItemCatalog(when);
      then(
        'the items with a name that match that provided by the user are retrieved',
        () => {
          const expected_items: Array<CatalogItemDTO> = catalog_items.filter(
            (item: CatalogItemDTO) =>
              item.name.includes(query_catalog_input.item_name)
          );
          expect(expected_items.length).toEqual(query_catalog_output.items.length);
          expected_items.forEach((expected_item: CatalogItemDTO) => {
            expect(
              query_catalog_output
                .items
                .some((item: CatalogItemDTO) => item.name === expected_item.name)
            )
              .toEqual(true);
          });
        }
      );
    }
  );
});
