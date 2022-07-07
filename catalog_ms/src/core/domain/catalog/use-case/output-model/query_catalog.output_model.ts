import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default interface QueryCatalogOutputModel {
  items: Array<CatalogItemDTO>;
}
