import CatalogRepository from '@core/domain/catalog/use-case/repository/catalog.repository'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import { getCurrentDateString } from '@core/common/util/time/date_utils'
import QueryCatalogQueryModel from '@core/domain/catalog/use-case/query-model/query_catalog.query_model'
import { PaginationDTO } from '@core/common/persistence/pagination.dto'

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

  public async findAll(params: QueryCatalogQueryModel, pagination?: PaginationDTO): Promise<CatalogItemDTO[]> {
    const items: Array<CatalogItemDTO> = [];
    for (const item of this.catalog_items.values()) {
      if (params.item_name !== undefined) {
        if (item.name.includes(params.item_name)) {
          items.push(item);
        }
      } else {
        items.push(item)
      }
    }
    return Promise.resolve(items);
  }
}
