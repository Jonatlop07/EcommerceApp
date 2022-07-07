Feature: Query Catalog

  Scenario: A user queries item catalog
    Given these items exists in the catalog:
      | vendor_id | name  | description    | price | units_available |
      | 1         | item1 | generic item 1 | 1.0   | 1               |
      | 1         | item2 | generic item 2 | 1.0   | 1               |
      | 1         | item3 | generic item 3 | 1.0   | 1               |
    When the user tries to query item catalog
    Then the following items are retrieved:
      | vendor_id | name  | description    | price | units_available |
      | 1         | item1 | generic item 1 | 1.0   | 1               |
      | 1         | item2 | generic item 2 | 1.0   | 1               |
      | 1         | item3 | generic item 3 | 1.0   | 1               |

  Scenario Outline: A user queries item catalog by item name
    Given these items exists in the catalog:
      | vendor_id | name  | description    | price | units_available |
      | 1         | item1 | generic item 1 | 1.0   | 1               |
      | 1         | item2 | generic item 2 | 1.0   | 1               |
      | 1         | item3 | generic item 3 | 1.0   | 1               |
    And a user wants to query items in the catalog that match the name: "<ItemName>"
    When the user tries to query item catalog
    Then the items with a name that match that provided by the user are retrieved

    Examples:
      | ItemName |
      | item     |
      | item2    |
      | itm      |
