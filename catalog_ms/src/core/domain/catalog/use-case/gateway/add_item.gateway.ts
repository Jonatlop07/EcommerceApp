import Create from '@core/common/persistence/create'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default interface AddItemGateway extends Create<CatalogItemDTO, CatalogItemDTO> {}
