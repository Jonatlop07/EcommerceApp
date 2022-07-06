import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import CreateCatalogItemDocumentDTO
  from '@infrastructure/adapter/persistence/mongodb/entity/dto/create_catalog_item_document.dto'

export default class CreateCatalogItemDataMapper {
  public static toDocumentDTO(dto: CatalogItemDTO): CreateCatalogItemDocumentDTO {
    return {
      cat_vendor_id: dto.vendor_id,
      cat_name: dto.name,
      cat_description: dto.description,
      cat_price: dto.price,
      cat_units_available: dto.units_available
    };
  }
}
