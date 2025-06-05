Feature: E-commerce Platform

    Scenario: Placing the Order
        Given a login to Ecommerce application with "loaizafcamilo@gmail.com" and "testing11%"
        When add product "ZARA COAT 3" to Cart
        Then verify "ZARA COAT 3" is added to Cart
        When enter valid details and place the order
        Then verify order is present in the order history