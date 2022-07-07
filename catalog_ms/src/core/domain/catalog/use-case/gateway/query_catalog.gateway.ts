import FindAll from '@core/common/persistence/find_all';
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto';
import QueryCatalogQueryModel from '@core/domain/catalog/use-case/query-model/query_catalog.query_model';

export default interface QueryCatalogGateway extends FindAll<QueryCatalogQueryModel, CatalogItemDTO> {}
