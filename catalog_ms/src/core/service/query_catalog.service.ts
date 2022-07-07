import QueryCatalogInteractor from '@core/domain/catalog/use-case/interactor/query_catalog.interactor'
import QueryCatalogInputModel from '@core/domain/catalog/use-case/input-model/query_catalog.input_model'
import QueryCatalogOutputModel from '@core/domain/catalog/use-case/output-model/query_catalog.output_model'
import { Inject, Logger } from '@nestjs/common'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'
import QueryCatalogGateway from '@core/domain/catalog/use-case/gateway/query_catalog.gateway'

export default class QueryCatalogService implements QueryCatalogInteractor {
  private readonly logger: Logger = new Logger(QueryCatalogService.name);

  constructor(
    @Inject(CatalogDITokens.CatalogRepository)
    private readonly gateway: QueryCatalogGateway
  ) {}

  public async execute(input: QueryCatalogInputModel): Promise<QueryCatalogOutputModel> {
    const queried_items: Array<CatalogItemDTO> = await this.gateway.findAll(
      {
        item_name: input.item_name
      },
      input.pagination
    );
    return {
      items: queried_items
    };
  }
}
