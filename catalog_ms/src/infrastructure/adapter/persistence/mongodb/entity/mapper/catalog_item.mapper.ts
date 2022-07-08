import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import CatalogItemDocument from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.document'
import { toMomentString } from '@core/common/util/time/date_utils'

export default class CatalogItemMapper {
  public static toDTO(catalog_item: CatalogItemDocument): CatalogItemDTO {
    return {
      item_id: catalog_item.cat_item_id,
      vendor_id: catalog_item.cat_vendor_id,
      name: catalog_item.cat_name,
      description: catalog_item.cat_description,
      media_uris: catalog_item.cat_media_uris,
      created_at: toMomentString(catalog_item.cat_created_at),
      updated_at: catalog_item.cat_updated_at ? toMomentString(catalog_item.cat_updated_at) : null
    };
  }
}
