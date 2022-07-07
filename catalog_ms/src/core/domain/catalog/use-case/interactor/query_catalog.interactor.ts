import { Interactor } from '@core/common/use-case/interactor'
import QueryCatalogInputModel from '@core/domain/catalog/use-case/input-model/query_catalog.input_model'
import QueryCatalogOutputModel from '@core/domain/catalog/use-case/output-model/query_catalog.output_model'

export default interface QueryCatalogInteractor extends Interactor<QueryCatalogInputModel, QueryCatalogOutputModel> {}
