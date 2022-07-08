import CatalogItem from '@core/domain/catalog/entity/catalog_item';
import CreateCatalogItemEntityPayload from '@core/domain/catalog/entity/type/create_catalog_item_entity_payload';

describe('CatalogItem entity', () => {
  const valid_catalog_item: CreateCatalogItemEntityPayload = {
    vendor_id: '1',
    name: 'item1',
    description: 'generic item',
    media_uris: ['a', 'b']
  };

  it('should not throw when item details are valid', async () => {
    const catalog_item = await CatalogItem.new(valid_catalog_item);
    expect(catalog_item).toBeDefined();
  });
});
