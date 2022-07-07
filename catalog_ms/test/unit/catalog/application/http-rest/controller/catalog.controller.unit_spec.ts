import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import { Test } from '@nestjs/testing'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import addItemStub from '@test/unit/utils/stubs/add_item.stub'
import CatalogController from '@application/api/http-rest/controller/catalog.controller'
import AddItemServiceMock from '@test/unit/utils/mocks/add_item.service.mock'
import AddItemResponse from '@application/api/http-rest/response/add_item.response'
import QueryCatalogResponse from '@application/api/http-rest/response/query_catalog.response'
import queryCatalogByItemNameStub from '@test/unit/utils/stubs/query_catalog_by_item_name.stub'
import QueryCatalogInteractor from '@core/domain/catalog/use-case/interactor/query_catalog.interactor'
import QueryCatalogServiceMock from '@test/unit/utils/mocks/query_catalog.service.mock'
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub'

describe('CatalogController', () => {
  let catalog_controller: CatalogController;

  let add_item_interactor: AddItemInteractor;
  let add_item_response: AddItemResponse;

  let query_catalog_interactor: QueryCatalogInteractor;
  let query_catalog_response: QueryCatalogResponse;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: CatalogDITokens.AddItemInteractor,
          useClass: AddItemServiceMock
        },
        {
          provide: CatalogDITokens.QueryCatalogInteractor,
          useClass: QueryCatalogServiceMock
        }
      ],
      controllers: [CatalogController]
    }).compile();

    catalog_controller = module_ref.get<CatalogController>(CatalogController);
    add_item_interactor = module_ref.get<AddItemInteractor>(CatalogDITokens.AddItemInteractor);
    query_catalog_interactor = module_ref.get<QueryCatalogInteractor>(CatalogDITokens.QueryCatalogInteractor);

    jest.clearAllMocks();
  });

  describe('add item to catalog', () => {
    describe('when addItem is called', () => {
      beforeEach(async () => {
        add_item_response = await catalog_controller.addItem(addItemStub());
      });

      it('should call add_item_interactor', () => {
        expect(add_item_interactor.execute).toBeCalledWith(addItemStub());
      });

      it('should return a response with the created item', () => {
        expect(add_item_response).toBeDefined();
        expect(add_item_response).toHaveProperty('created_item');
      });
    });
  });

  describe('query items of the catalog', () => {
    describe('when queryCatalog is called', () => {
      beforeEach(async () => {
        query_catalog_response = await catalog_controller.queryCatalog({
          item_name: queryCatalogByItemNameStub().item_name,
        });
      });

      it('should call query_catalog_interactor', () => {
        expect(query_catalog_interactor.execute).toBeCalledWith(queryCatalogByItemNameStub());
      });

      it('should return a response with a collection of items', () => {
        expect(query_catalog_response).toBeDefined();
        expect(query_catalog_response).toHaveProperty('queried_items', itemCollectionStub());
      });
    });
  });
});
