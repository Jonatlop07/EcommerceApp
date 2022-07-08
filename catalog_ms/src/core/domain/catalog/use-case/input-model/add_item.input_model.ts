import { Id } from '@core/common/type/common_types'

export default interface AddItemInputModel {
  vendor_id: Id;
  name: string;
  description: string;
  media_uris: Array<string>;
}
