export default interface CreateCatalogItemDocumentDTO {
  cat_item_id: string;
  cat_vendor_id: string;
  cat_name: string;
  cat_description: string;
  cat_media_uris: Array<string>;
}
