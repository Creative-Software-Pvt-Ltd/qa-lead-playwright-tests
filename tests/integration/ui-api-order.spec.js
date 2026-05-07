const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.page');
const { ProductPage } = require('../../pages/ProductPage.page');
const { CartPage } = require('../../pages/CartPage.page');
const { CheckoutPage } = require('../../pages/CheckoutPage.page');



test.describe('Inventory flow', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);  
      await loginPage.goto();
      await loginPage.login(
        process.env.TEST_USERNAME,
        process.env.TEST_PASSWORD
      );
});


//placing an order through UI and fetch it in API
test('Place an Order and validate via API', async ({ page, request }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);


    const response1 = await request.post(
        `${process.env.API_BASE_URL}/auth/login`,
        {
            data: {
                password: "password123",
                username: "testuser"
              },
        }
      );
      expect([200]).toContain(response1.status());
      const loginBody = await response1.json();
      console.log(loginBody);
      const token = loginBody.token;



    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();
    await checkoutPage.addshippingdetails();  
    await checkoutPage.placeorderfunc();
    await expect(checkoutPage.orderconfirmtxt).toHaveText('Order Confirmed');
    const orderId = await checkoutPage.orderidtxt.textContent();
    console.log('Order ID:', orderId);
    

    const orderResponse = await request.get(
        `${process.env.API_BASE_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    expect(orderResponse.status()).toBe(200);

});
  

});