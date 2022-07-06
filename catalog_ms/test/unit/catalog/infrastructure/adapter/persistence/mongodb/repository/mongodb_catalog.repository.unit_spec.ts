import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'
import MongoDBCatalogRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository'
import CreateCatalogItemDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_catalog_item_document.dto'
import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub'
import createdItemStub from '@test/unit/utils/stubs/created_item.stub'
import MongoDBCatalogItemModelMock from '@test/unit/utils/mocks/mongodb_catalog_item.model.mock'
import CreateCatalogItemDataMapper
  from '@infrastructure/adapter/persistence/mongodb/entity/mapper/create_catalog_item_data.mapper'

describe('MongoDBCatalogRepository', () => {
  let mongodb_catalog_repository: MongoDBCatalogRepository;
  let account_model: MongoDBCatalogItemModelMock;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        MongoDBCatalogRepository,
        {
          provide: getModelToken(CatalogItem.name),
          useClass: MongoDBCatalogItemModelMock
        }
      ]
    }).compile();

    mongodb_catalog_repository = module_ref.get<MongoDBCatalogRepository>(MongoDBCatalogRepository);
    account_model = module_ref.get<MongoDBCatalogItemModelMock>(getModelToken(CatalogItem.name));

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let catalog_item: CatalogItem;
      let create_spy: jest.SpyInstance;
      let create_catalog_item_document_dto: CreateCatalogItemDocumentDTO = CreateCatalogItemDataMapper
        .toDocumentDTO(
          createdItemStub()
        );

      beforeEach(async () => {
        create_spy = jest.spyOn(MongoDBCatalogItemModelMock.prototype, 'create');
        catalog_item = await mongodb_catalog_repository.create(create_catalog_item_document_dto);
      });

      it('should call account_model', () => {
        expect(create_spy).toHaveBeenCalledWith(create_catalog_item_document_dto);
      });

      it('should return a user', () => {
        expect(catalog_item).toEqual(createdCatalogItemModelStub());
      });
    });
  });
});
