import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from '@nestjs/common'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import HttpItemDetailsDTO from '@application/api/http-rest/dto/http_item_details.dto'
import AddItemResponse from '@application/api/http-rest/response/add_item.response'

@Controller('catalog')
@ApiTags('catalog')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export default class CatalogController {
  private readonly logger: Logger = new Logger(CatalogController.name);

  constructor(
    @Inject(CatalogDITokens.AddItemInteractor)
    private readonly add_item_interactor: AddItemInteractor
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Item successfully added to the catalog'
  })
  async addItem(@Body() item_details: HttpItemDetailsDTO): Promise<AddItemResponse> {
    return {
      created_item: null
    }
  }
}
