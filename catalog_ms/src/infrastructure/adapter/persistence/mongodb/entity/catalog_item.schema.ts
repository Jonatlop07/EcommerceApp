import { SchemaFactory } from '@nestjs/mongoose'
import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'

const CatalogItemSchema = SchemaFactory.createForClass(CatalogItem);

export default CatalogItemSchema;
