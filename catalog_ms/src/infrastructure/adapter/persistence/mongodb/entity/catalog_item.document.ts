import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'
import { Document } from 'mongoose'

type CatalogItemDocument = CatalogItem & Document;

export default CatalogItemDocument;
