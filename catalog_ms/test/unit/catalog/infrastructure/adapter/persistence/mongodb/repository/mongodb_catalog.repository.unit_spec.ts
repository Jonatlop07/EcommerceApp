import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model';
import MongoDBCatalogRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_catalog.repository';
import CreateCatalogItemDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_catalog_item_document.dto';
import createdCatalogItemModelStub from '@test/unit/utils/stubs/created_catalog_item.model.stub';
import createdItemStub from '@test/unit/utils/stubs/created_item.stub';
import MongoDBCatalogItemModelMock from '@test/unit/utils/mocks/mongodb_catalog_item.model.mock';
import CreateCatalogItemDataMapper
  from '@infrastructure/adapter/persistence/mongodb/entity/mapper/create_catalog_item_data.mapper';
import CatalogItemDocument from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.document'
import { FilterQuery } from 'mongoose'
import queryCatalogByItemNameStub from '@test/unit/utils/stubs/query_catalog_by_item_name.stub'
import itemModelCollectionStub from '@test/unit/utils/stubs/item_model_collection.stub'

describe('MongoDBCatalogRepository', () => {
  let mongodb_catalog_repository: MongoDBCatalogRepository;
  let account_model: MongoDBCatalogItemModelMock;
  let catalog_filter_query: FilterQuery<CatalogItem>;

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
    catalog_filter_query = {
      cat_name: queryCatalogByItemNameStub().item_name
    };

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

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let findAll_spy: jest.SpyInstance;
      let item_document_collection: Array<CatalogItemDocument>;

      beforeEach(async () => {
        findAll_spy = jest.spyOn(MongoDBCatalogItemModelMock.prototype, 'find');
        item_document_collection = await mongodb_catalog_repository.findAll(catalog_filter_query);
      });

      it('should call account_model', () => {
        expect(findAll_spy).toHaveBeenCalledWith(catalog_filter_query, {
          _id: 0,
          __v: 0
        });
      });

      it('should return a user', () => {
        expect(item_document_collection).toEqual(itemModelCollectionStub());
      });
    });
  });
});
