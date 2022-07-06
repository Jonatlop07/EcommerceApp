import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export default class CatalogItem {
  @Prop()
  cat_vendor_id: string;

  @Prop()
  cat_name: string;

  @Prop()
  cat_description: string;

  @Prop()
  cat_price: number;

  @Prop()
  cat_units_available: number;

  @Prop()
  cat_created_at: Date;

  @Prop()
  cat_updated_at: Date;
}
