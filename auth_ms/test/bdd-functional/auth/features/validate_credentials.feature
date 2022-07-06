Feature: Validate Credentials

  Scenario Outline: A user tries to login with credentials in a valid format
    Given the user provides the credentials: "<Username>" and "<Password>"
    And an account exists with those credentials
    When the user tries to login
    Then the credentials are in a valid format and match an existing account

    Examples:
      | Username | Password  |
      | new_user | Abc123_tr |

  Scenario Outline: A user tries to login with credentials that do not match an existing account
    Given the user provides the credentials: "<Username>" and "<Password>"
    When the user tries to login
    Then the credentials are not valid: an account with the credentials provided does not exist

    Examples:
      | Username | Password  |
      | new_user | Abc123_tr |
