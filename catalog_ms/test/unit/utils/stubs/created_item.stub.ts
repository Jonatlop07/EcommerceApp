import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

const createdItemStub = (): CatalogItemDTO => ({
  item_id: '1',
  vendor_id: '1',
  name: 'item1',
  description: '',
  media_uris: ['a', 'b'],
  created_at: '2022/03/22 11:54:02',
  updated_at: null
});

export default createdItemStub;
