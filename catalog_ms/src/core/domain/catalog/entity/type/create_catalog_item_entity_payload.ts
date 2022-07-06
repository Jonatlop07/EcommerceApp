import { Id, Optional } from '@core/common/type/common_types'

export default interface CreateCatalogItemEntityPayload {
  item_id?: Optional<Id>;
  vendor_id: Id;
  name: string;
  description: string;
  price: number;
  units_available: number;
  created_at?: Optional<string>;
  updated_at?: Optional<string>;
}
