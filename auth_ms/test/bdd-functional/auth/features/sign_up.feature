Feature: Sign Up

  Scenario Outline: A user tries to create an account with credentials in a valid format
    Given the user provides the credentials: "<Username>" and "<Password>"
    When the user tries to sign up
    Then their account is successfully created and the user can log into it

    Examples:
      | Username | Password  |
      | new_user | Abc123_tr |

  Scenario Outline: A user attempts to create an account with the credentials in an invalid format
    Given the user provides the credentials: "<Username>" and "<Password>"
    When the user tries to sign up
    Then an error occurs: the credentials provided by the user are in an invalid format

    Examples:
      | Username | Password  |
      | new user | Ab12_     |
      | new      | Abc123_tr |
      | new user | Abcdefghi |
      |          | Abc123_tr |

  Scenario Outline: A user fails to create an account because the username they provide is already in use
    Given the user provides the credentials: "<Username>" and "<Password>"
    And there already exists a user with the username provided
    When the user tries to sign up
    Then an error occurs: the username is already in use

    Examples:
      | Username | Password  |
      | new_user | Abc123_tr |
