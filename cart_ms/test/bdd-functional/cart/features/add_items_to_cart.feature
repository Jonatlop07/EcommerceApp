Feature: Add Items to Cart

  Scenario Outline: A user adds items to the cart
    Given the user provides the items to be added:
      | item_id |
      |         |
      |         |
    When the user tries to add the items to the cart
    Then the items are added to the cart

    Examples:
      | UserId |
      |    1   |

  Scenario Outline: A user tries to add an empty list of items to the cart
    Given the user provides an empty list of items to be added
      | item_id |
    When the user tries to add the items to the cart
    Then error: there are no items to be added

    Examples:
      | UserId |
      |   1    |
