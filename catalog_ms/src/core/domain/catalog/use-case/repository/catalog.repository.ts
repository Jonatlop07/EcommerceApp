import AddItemGateway from '@core/domain/catalog/use-case/gateway/add_item.gateway'
import QueryCatalogGateway from '@core/domain/catalog/use-case/gateway/query_catalog.gateway'

export default interface CatalogRepository
  extends AddItemGateway, QueryCatalogGateway {}
