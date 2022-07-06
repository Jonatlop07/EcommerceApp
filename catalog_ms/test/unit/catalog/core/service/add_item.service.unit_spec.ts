import AddItemService from '@core/service/add_item.service'
import { Test } from '@nestjs/testing'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository'
import addItemStub from '@test/unit/utils/stubs/add_item.stub'
import CatalogRepositoryMock from '@test/unit/utils/mocks/catalog.repository.mock'

describe('AddItemService', () => {
  let add_item_service: AddItemService;
  let catalog_repository: CatalogRepository;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: CatalogDITokens.CatalogRepository,
          useClass: CatalogRepositoryMock
        },
        AddItemService
      ]
    }).compile();

    add_item_service = module_ref.get<AddItemService>(AddItemService);
    catalog_repository = module_ref.get<CatalogRepository>(CatalogDITokens.CatalogRepository);
    jest.clearAllMocks();
  });

  describe('execute', () => {
    describe('when execute is called', () => {
      beforeEach(async () => {
        await add_item_service.execute(addItemStub());
      });

      it('should call gateway.create', () => {
        expect(catalog_repository.create).toBeCalled();
      });
    });
  });
});
