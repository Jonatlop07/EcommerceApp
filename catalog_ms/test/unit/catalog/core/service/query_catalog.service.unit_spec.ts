import QueryCatalogService from '@core/service/query_catalog.service';
import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository';
import { Test } from '@nestjs/testing';
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens';
import CatalogRepositoryMock from '@test/unit/utils/mocks/catalog.repository.mock';
import queryCatalogByItemNameStub from '@test/unit/utils/stubs/query_catalog_by_item_name.stub'
import QueryCatalogOutputModel from '@core/domain/catalog/use-case/output-model/query_catalog.output_model'
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub'

describe('QueryCatalog Service', () => {
  let query_catalog_service: QueryCatalogService;
  let catalog_repository: CatalogRepository;
  let output: QueryCatalogOutputModel;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        {
          provide: CatalogDITokens.CatalogRepository,
          useClass: CatalogRepositoryMock
        },
        QueryCatalogService
      ]
    }).compile();

    query_catalog_service = module_ref.get<QueryCatalogService>(QueryCatalogService);
    catalog_repository = module_ref.get<CatalogRepository>(CatalogDITokens.CatalogRepository);
    jest.clearAllMocks();
  });

  describe('execute', () => {
    describe('when execute is called', () => {
      beforeEach(async () => {
        output = await query_catalog_service.execute(queryCatalogByItemNameStub());
      });

      it('should call gateway.findAll', () => {
        expect(catalog_repository.findAll).toBeCalledWith(queryCatalogByItemNameStub(), undefined);
      });

      it('should return a collection of items', () => {
        expect(output).toHaveProperty('items', itemCollectionStub());
      });
    });
  });
});
