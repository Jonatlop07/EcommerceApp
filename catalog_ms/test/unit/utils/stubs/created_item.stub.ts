import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

const createdItemStub = (): CatalogItemDTO => ({
  item_id: '1',
  vendor_id: '1',
  name: 'item1',
  description: '',
  price: 1.0,
  units_available: 1,
  created_at: '2022/03/22 11:54:02',
  updated_at: null
});

export default createdItemStub;
