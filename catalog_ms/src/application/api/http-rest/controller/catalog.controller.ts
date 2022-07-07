import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post, Query } from '@nestjs/common';
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens';
import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor';
import QueryCatalogInteractor from '@core/domain/catalog/use-case/interactor/query_catalog.interactor';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import HttpItemDetailsDTO from '@application/api/http-rest/dto/http_item_details.dto';
import AddItemResponse from '@application/api/http-rest/response/add_item.response';
import AddItemMapper from '@application/api/http-rest/mapper/add_item.mapper';
import HttpQueryCatalogDTO from '@application/api/http-rest/dto/http_query_catalog.dto'
import QueryCatalogResponse from '@application/api/http-rest/response/query_catalog.response'
import QueryCatalogMapper from '@application/api/http-rest/mapper/query_catalog.mapper'

@Controller('catalog')
@ApiTags('catalog')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export default class CatalogController {
  private readonly logger: Logger = new Logger(CatalogController.name);

  constructor(
    @Inject(CatalogDITokens.AddItemInteractor)
    private readonly add_item_interactor: AddItemInteractor,
    @Inject(CatalogDITokens.QueryCatalogInteractor)
    private readonly query_catalog_interactor: QueryCatalogInteractor
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Item successfully added to the catalog'
  })
  async addItem(@Body() item_details: HttpItemDetailsDTO): Promise<AddItemResponse> {
    const { created_item } = await this.add_item_interactor.execute(
      AddItemMapper.toInputModel(item_details)
    );
    return { created_item };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Catalog items successfully queried'
  })
  async queryCatalog(@Query() query_params: HttpQueryCatalogDTO): Promise<QueryCatalogResponse> {
    const { items } = await this.query_catalog_interactor.execute(
      QueryCatalogMapper.toInputModel(query_params)
    );
    return Promise.resolve({
      queried_items: items
    });
  }
}
