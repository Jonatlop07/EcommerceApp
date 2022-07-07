import MongoDBCatalogRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository.adapter';
import MongoDBCatalogRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository';
import { Test } from '@nestjs/testing';
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens';
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto';
import createdItemStub from '@test/unit/utils/stubs/created_item.stub';
import MongoDBCatalogRepositoryMock from '@test/unit/utils/mocks/mongodb_catalog.repository.mock';
import createCatalogItemDocumentDTOStub from '@test/unit/utils/stubs/create_catalog_item.document_dto.stub';
import itemCollectionStub from '@test/unit/utils/stubs/item_collection.stub';
import queryCatalogByItemNameStub from '@test/unit/utils/stubs/query_catalog_by_item_name.stub'
import QueryCatalogQueryModel from '@core/domain/catalog/use-case/query-model/query_catalog.query_model'

describe('MongoDBCatalogRepositoryAdapter', () => {
  let catalog_repository_adapter: MongoDBCatalogRepositoryAdapter;
  let catalog_repository: MongoDBCatalogRepository;
  let catalog_query_model: QueryCatalogQueryModel;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        MongoDBCatalogRepositoryAdapter,
        {
          provide: MongoDBDITokens.CatalogRepository,
          useClass: MongoDBCatalogRepositoryMock
        }
      ]
    }).compile();

    catalog_repository_adapter = module_ref.get<MongoDBCatalogRepositoryAdapter>(MongoDBCatalogRepositoryAdapter);
    catalog_repository = module_ref.get<MongoDBCatalogRepository>(MongoDBDITokens.CatalogRepository);
    catalog_query_model = {
      item_name: queryCatalogByItemNameStub().item_name
    };

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when repository.create is called', () => {
      let catalog_item_dto: CatalogItemDTO;

      beforeEach(async () => {
        catalog_item_dto = await catalog_repository_adapter.create(createdItemStub());
      });

      it('should call repository.create', () => {
        expect(catalog_repository.create).toHaveBeenCalledWith(createCatalogItemDocumentDTOStub());
      });

      it('should return account_dto', () => {
        expect(catalog_item_dto).toEqual(createdItemStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let catalog_item_collection_dto: Array<CatalogItemDTO>;

      beforeEach(async () => {
        catalog_item_collection_dto = await catalog_repository_adapter.findAll(catalog_query_model);
      });

      it('should call repository.findOne', () => {
        expect(catalog_repository.findAll).toHaveBeenCalledWith(catalog_query_model);
      });

      it('should return account dto', () => {
        expect(catalog_item_collection_dto).toEqual(itemCollectionStub());
      });
    });
  });
});
