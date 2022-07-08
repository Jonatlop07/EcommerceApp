Feature: Add Item

  Scenario Outline: A user adds an item to the catalog
    Given a user wants to provide the details of the item to add
    And the details are: "<VendorId>", "<Name>", "<Description>", "<MediaURIs>"

    When the user tries to add the item
    Then the item is successfully added to the catalog

    Examples:
      | VendorId | Name  | Description  | MediaURIs |
      | 1        | item1 | generic item | a;b       |
