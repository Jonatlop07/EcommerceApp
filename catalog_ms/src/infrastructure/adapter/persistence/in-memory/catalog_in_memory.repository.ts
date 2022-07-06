import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import { getCurrentDateString } from '@core/common/util/time/date_utils'

export default class CatalogInMemoryRepository implements CatalogRepository {
  private currently_available_catalog_item_id: string;

  constructor(public readonly catalog_items: Map<string, CatalogItemDTO>) {
    this.currently_available_catalog_item_id = '1';
  }

  public async create(catalog_item: CatalogItemDTO): Promise<CatalogItemDTO> {
    const new_catalog_item: CatalogItemDTO = {
      item_id: this.currently_available_catalog_item_id,
      vendor_id: catalog_item.vendor_id,
      name: catalog_item.name,
      description: catalog_item.description,
      price: catalog_item.price,
      units_available: catalog_item.units_available,
      created_at: getCurrentDateString(),
      updated_at: null
    };
    this.catalog_items.set(this.currently_available_catalog_item_id, new_catalog_item);
    this.currently_available_catalog_item_id = `${Number(this.currently_available_catalog_item_id) + 1}`;
    return Promise.resolve(new_catalog_item);
  }
}
