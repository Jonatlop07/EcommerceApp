import CatalogItem from '@core/domain/catalog/entity/catalog_item'
import CreateCatalogItemEntityPayload from '@core/domain/catalog/entity/type/create_catalog_item_entity_payload'
import { CoreException } from '@core/common/exception/core.exception'
import { Code } from '@core/common/code/code'

describe('CatalogItem entity', () => {
  const valid_catalog_item: CreateCatalogItemEntityPayload = {
    vendor_id: '1',
    name: 'item1',
    description: 'generic item',
    price: 1.0,
    units_available: 1
  };

  const invalid_price_error_message = 'CatalogItem: Invalid price -> Should be a real number greater or equal to 0.0';
  const invalid_units_available_error_message = 'CatalogItem: Invalid units available -> Should be an integer greater or equal to 0';

  it('should throw when the price is invalid', async () => {
    const invalid_price = -1.0;
    try {
      await CatalogItem.new({
        ...valid_catalog_item,
        price: invalid_price
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CoreException);
      expect(error).toHaveProperty('code', Code.ENTITY_VALIDATION_ERROR.code);
      expect(error).toHaveProperty('message', invalid_price_error_message);
    }
  });

  it('should throw when units_available is invalid', async () => {
    const invalid_units_available = -1;
    try {
      await CatalogItem.new({
        ...valid_catalog_item,
        units_available: invalid_units_available
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CoreException);
      expect(error).toHaveProperty('code', Code.ENTITY_VALIDATION_ERROR.code);
      expect(error).toHaveProperty('message', invalid_units_available_error_message);
    }
  });

  it('should not throw when item details are valid', async () => {
    const catalog_item = await CatalogItem.new(valid_catalog_item);
    expect(catalog_item).toBeDefined();
  });
});
