import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export default class CatalogItem {
  @Prop()
  cat_item_id: string;

  @Prop()
  cat_vendor_id: string;

  @Prop()
  cat_name: string;

  @Prop()
  cat_description: string;

  @Prop()
  cat_media_uris: Array<string>;

  @Prop()
  cat_created_at: Date;

  @Prop()
  cat_updated_at: Date;
}
