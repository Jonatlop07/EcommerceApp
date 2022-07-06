import CreateCatalogItemDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_catalog_item_document.dto'

const createCatalogItemDocumentDTOStub = (): CreateCatalogItemDocumentDTO => ({
  cat_item_id: '1',
  cat_vendor_id: '1',
  cat_name: 'item1',
  cat_description: '',
  cat_price: 1.0,
  cat_units_available: 1
});

export default createCatalogItemDocumentDTOStub;
