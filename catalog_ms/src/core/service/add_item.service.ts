import AddItemInteractor from '@core/domain/catalog/use-case/interactor/add_item.interactor'
import AddItemOutputModel from '@core/domain/catalog/use-case/output-model/add_item.output_model'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'
import CatalogItem from '@core/domain/catalog/entity/catalog_item'
import { Inject, Logger } from '@nestjs/common'
import CatalogDITokens from '@core/domain/catalog/di/catalog_di_tokens'
import AddItemGateway from '@core/domain/catalog/use-case/gateway/add_item.gateway'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default class AddItemService implements AddItemInteractor {
  private readonly logger: Logger = new Logger(AddItemService.name);

  constructor(
    @Inject(CatalogDITokens.CatalogRepository)
    private readonly gateway: AddItemGateway
  ) {
  }

  public async execute(input: AddItemInputModel): Promise<AddItemOutputModel> {
    const catalog_item = await CatalogItem.new({
      vendor_id: input.vendor_id,
      name: input.name,
      description: input.description,
      media_uris: input.media_uris
    });
    const created_item: CatalogItemDTO = await this.gateway.create(catalog_item.toDTO());
    return {
      created_item
    };
  }
}
