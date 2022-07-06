import MongoDBCatalogRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository.adapter'
import MongoDBCatalogRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository'
import { Test } from '@nestjs/testing'
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import createdItemStub from '@test/unit/utils/stubs/created_item.stub'
import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub'
import MongoDBCatalogRepositoryMock from '@test/unit/utils/mocks/mongodb_catalog.repository.mock'

describe('MongoDBCatalogRepositoryAdapter', () => {
  let auth_repository_adapter: MongoDBCatalogRepositoryAdapter;
  let auth_repository: MongoDBCatalogRepository;

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

    auth_repository_adapter = module_ref.get<MongoDBCatalogRepositoryAdapter>(MongoDBCatalogRepositoryAdapter);
    auth_repository = module_ref.get<MongoDBCatalogRepository>(MongoDBDITokens.CatalogRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when repository.create is called', () => {
      let catalog_item_dto: CatalogItemDTO;

      beforeEach(async () => {
        catalog_item_dto = await auth_repository_adapter.create(createdItemStub());
      });

      it('should call repository.create', () => {
        expect(auth_repository.create).toHaveBeenCalledWith(createdCatalogItemModelStub());
      });

      it('should return account_dto', () => {
        expect(catalog_item_dto).toEqual(createdItemStub());
      });
    });
  });
});
