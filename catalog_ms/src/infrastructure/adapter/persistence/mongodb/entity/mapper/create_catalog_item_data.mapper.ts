import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import CreateCatalogItemDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_catalog_item_document.dto'

export default class CreateCatalogItemDataMapper {
  public static toDocumentDTO(dto: CatalogItemDTO): CreateCatalogItemDocumentDTO {
    return {
      cat_item_id: dto.item_id,
      cat_vendor_id: dto.vendor_id,
      cat_name: dto.name,
      cat_description: dto.description,
      cat_media_uris: dto.media_uris
    };
  }
}
