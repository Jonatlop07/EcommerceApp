export default class CatalogDITokens {
  public static readonly AddItemInteractor: unique symbol = Symbol('AddItemInteractor');
  public static readonly QueryCatalogInteractor: unique symbol = Symbol('QueryCatalogInteractor');
  public static readonly CatalogRepository: unique symbol = Symbol('CatalogRepository');
}
