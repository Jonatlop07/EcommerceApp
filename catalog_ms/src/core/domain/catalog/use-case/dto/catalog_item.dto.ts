import { Id, Nullable, Optional } from '@core/common/type/common_types'

export default interface CatalogItemDTO {
  item_id: Id;
  vendor_id: Id;
  name: string;
  description: string;
  price: number;
  units_available: number;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
}
