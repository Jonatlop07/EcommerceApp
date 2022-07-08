import HttpItemDetailsDTO from '@application/api/http-rest/dto/http_item_details.dto'
import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'

export default class AddItemMapper {
  public static toInputModel(dto: HttpItemDetailsDTO): AddItemInputModel {
    return {
      vendor_id: dto.vendor_id,
      name: dto.name,
      description: dto.description,
      media_uris: dto.media_uris
    };
  }
}
