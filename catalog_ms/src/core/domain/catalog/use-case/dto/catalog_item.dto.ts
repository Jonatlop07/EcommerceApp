import { Id, Nullable } from '@core/common/type/common_types'

export default interface CatalogItemDTO {
  item_id: Id;
  vendor_id: Id;
  name: string;
  description: string;
  media_uris: Array<string>;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
}
