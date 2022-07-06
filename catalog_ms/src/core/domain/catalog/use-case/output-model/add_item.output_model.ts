import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default interface AddItemOutputModel {
  created_item: CatalogItemDTO;
}
