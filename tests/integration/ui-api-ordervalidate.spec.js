const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.page');
const { ProductPage } = require('../../pages/ProductPage.page');
const { CartPage } = require('../../pages/CartPage.page');
const { CheckoutPage } = require('../../pages/CheckoutPage.page');
const { customer, orderItems } = require('../../fixtures/testData');


test.describe('Inventory flow', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);  
      await loginPage.goto();
      await loginPage.login(
        process.env.TEST_USERNAME,
        process.env.TEST_PASSWORD
      );
});


//placing an order through UI, fetch it in API and Validate order ID, customer details, items, quantities, total, and status.
test('Place an Order and validate via API', async ({ page, request }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);


    const loginResponse = await request.post(
        `${process.env.API_BASE_URL}/auth/login`,
        {
            data: {
                password: process.env.TEST_PASSWORD,
                username: process.env.TEST_USERNAME
              },
        }
      );
      expect(loginResponse.status()).toBe(200);
      const loginBody = await loginResponse.json();
      //console.log(loginBody);
      const token = loginBody.token;

    await productPage.navigateToProducts();
    await cartPage.addProductToCart(orderItems[0].productId);
    await cartPage.addProductToCart(orderItems[1].productId);  
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails(customer);  
    await checkoutPage.placeOrderFunc();
    await expect(checkoutPage.orderConfirmationMessage).toHaveText('Order Confirmed');
    const orderId = await checkoutPage.orderIdText.textContent();
    //console.log('Order ID:', orderId);
    

    const orderResponse = await request.get(
        `${process.env.API_BASE_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    expect(orderResponse.status()).toBe(200);

      const orderBody = await orderResponse.json();

    expect(orderBody.order.id).toBe(orderId);

    expect(orderBody.order.status).toBe('CONFIRMED');                   //Here validating the order status
    expect(orderBody.order.id).toBe(orderId);                           //Here validating the order id
    expect(orderBody.order.customer.fullName).toBe(customer.fullName);  //Here validating the full name
    expect(orderBody.order.customer.address).toBe(customer.address);    //Here validating the address
    expect(orderBody.order.customer.city).toBe(customer.city);          //Here validating the city  
    expect(orderBody.order.items[0].productId).toBe(orderItems[0].productId);          //Here validating the product id of item1
    expect(orderBody.order.items[0].quantity).toBe(orderItems[0].quantity);                  //Here validating the quantity of item1
    expect(orderBody.order.items[0].name).toBe(orderItems[0].name);  //Here validating the product name of item1
    expect(orderBody.order.items[0].lineTotal).toBe(orderItems[0].price);             //Here validating the product price of item1   
    expect(orderBody.order.items[1].productId).toBe(orderItems[1].productId);          //Here validating the product id of item2
    expect(orderBody.order.items[1].quantity).toBe(orderItems[1].quantity);                  //Here validating the quantity of item2
    expect(orderBody.order.items[1].name).toBe(orderItems[1].name);          //Here validating the product name of item2
    expect(orderBody.order.items[1].lineTotal).toBe(orderItems[1].price);             //Here validating the product price of item2

    const calculatedTotal =
    orderBody.order.items[0].lineTotal + orderBody.order.items[1].lineTotal;

    expect(orderBody.order.total).toBe(calculatedTotal);                //Here validating the product total 

});
  

});