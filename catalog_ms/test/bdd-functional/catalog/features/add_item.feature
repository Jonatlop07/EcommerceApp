Feature: Add Item

  Scenario Outline: A user adds an item to the catalog
    Given a user wants to provide the details of the item to add
    And the details are: "<VendorId>", "<Name>", "<Description>", "<Price>", "<UnitsAvailable>"

    When the user tries to add the item
    Then the item is successfully added to the catalog

    Examples:
      | VendorId | Name  | Description  | Price | UnitsAvailable |
      | 1        | item1 | generic item | 1.0   | 2              |

  Scenario Outline: A user tries to add an item with invalid details to the catalog
    Given a user wants to provide the details of the item to add
    And the details are: "<VendorId>", "<Name>", "<Description>", "<Price>", "<UnitsAvailable>"
    When the user tries to add the item
    Then an error occurs: the item's details are invalid

    Examples:
      | VendorId | Name  | Description  | Price | UnitsAvailable |
      | 1        | item1 | generic item | -1.0  | 2              |
      | 1        |       |              | 1.0   | -1              |
