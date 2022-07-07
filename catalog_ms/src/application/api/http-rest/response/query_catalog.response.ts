import { IsArray } from 'class-validator'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default class QueryCatalogResponse {
  @IsArray()
  queried_items: Array<CatalogItemDTO>;
}
