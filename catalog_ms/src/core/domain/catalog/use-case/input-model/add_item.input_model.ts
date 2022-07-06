import { Id } from '@core/common/type/common_types'

export default interface AddItemInputModel {
  vendor_id: Id;
  name: string;
  description: string;
  price: number;
  units_available: number;
}
