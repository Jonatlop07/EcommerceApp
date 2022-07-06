import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'

const createdCatalogItemModelStub = (): CatalogItem => ({
  cat_vendor_id: '1',
  cat_name: 'item1',
  cat_description: '',
  cat_price: 1.0,
  cat_units_available: 1,
  cat_created_at: new Date('2022/03/22 11:54:02'),
  cat_updated_at: null
});

export default createdCatalogItemModelStub;
