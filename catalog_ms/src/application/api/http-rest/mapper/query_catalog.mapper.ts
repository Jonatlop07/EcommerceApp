import HttpQueryCatalogDTO from '@application/api/http-rest/dto/http_query_catalog.dto'
import QueryCatalogInputModel from '@core/domain/catalog/use-case/input-model/query_catalog.input_model'

export default class QueryCatalogMapper {
  public static toInputModel(dto: HttpQueryCatalogDTO): QueryCatalogInputModel {
    return {
      item_name: dto.item_name,
      pagination: !!dto.offset && !!dto.limit ? {
        offset: dto.offset,
        limit: dto.limit
      } : undefined
    };
  }
}
