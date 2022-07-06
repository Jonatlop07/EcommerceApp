import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import { Test } from '@nestjs/testing'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import addItemStub from '@test/unit/utils/stubs/add_item.stub'
import CatalogController from '@application/api/http-rest/controller/catalog.controller'
import AddItemServiceMock from '@test/unit/utils/mocks/add_item.service.mock'

describe('CatalogController', () => {
  let catalog_controller: CatalogController;
  let add_item_interactor: AddItemInteractor;
  let add_item_output: any;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: CatalogDITokens.AddItemInteractor,
          useClass: AddItemServiceMock
        }
      ],
      controllers: [CatalogController]
    }).compile();

    catalog_controller = module_ref.get<CatalogController>(CatalogController);
    add_item_interactor = module_ref.get<AddItemInteractor>(CatalogDITokens.AddItemInteractor);

    jest.clearAllMocks();
  });

  describe('add item to catalog', () => {
    describe('when addItem is called', () => {
      beforeEach(async () => {
        add_item_output = await catalog_controller.addItem(addItemStub());
      });

      it('should call add_item_interactor', () => {
        expect(add_item_interactor.execute).toBeCalledWith(addItemStub());
      });

      it('should return a response with the created item', () => {
        expect(add_item_output).toBeDefined();
        expect(add_item_output).toHaveProperty('created_item');
      });
    });
  })
});
