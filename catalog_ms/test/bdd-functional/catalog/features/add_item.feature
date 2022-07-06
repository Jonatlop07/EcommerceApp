Feature: Add Item

  Scenario: A user adds an item to the catalog
    Given a user provides the details of the item to add
      | vendor_id | name  | description  | price | units_available |
      | 1         | item1 | generic item | 1.0   | 2               |
    When the user tries to add the item
    Then the item is successfully added to the catalog

