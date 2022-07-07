import QueryCatalogInteractor from '@core/domain/catalog/use-case/interactor/query_catalog.interactor'
import QueryCatalogInputModel from '@core/domain/catalog/use-case/input-model/query_catalog.input_model'
import QueryCatalogOutputModel from '@core/domain/catalog/use-case/output-model/query_catalog.output_model'
import { Logger } from '@nestjs/common'

export default class QueryCatalogService implements QueryCatalogInteractor {
  private readonly logger: Logger = new Logger(QueryCatalogService.name);

  public async execute(input: QueryCatalogInputModel): Promise<QueryCatalogOutputModel> {
    return Promise.resolve(undefined);
  }
}
