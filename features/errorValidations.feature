Feature: Error Validations

    @Validation
    Scenario: Error on Invalid Login
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message "Incorrect" is displayed

        Examples:
            | username                | password     |
            | loaizafcamilo@gmail.com | testing1100% |
            | hello@123.com           | Iamhello@12  |