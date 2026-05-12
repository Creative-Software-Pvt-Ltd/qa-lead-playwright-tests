import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.page.js';
import { ProductPage } from '../../pages/ProductPage.page.js';
import { CartPage } from '../../pages/CartPage.page.js';
import { CheckoutPage } from '../../pages/CheckoutPage.page.js';

import {customer,orderItems} from '../../fixtures/testData.js';


test.describe('Inventory flow', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );

  });


  // placing an order through UI and fetch it in API
  test(
    'Place an Order and validate via API',
    async ({ page, request }) => {

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

      const token = loginBody.token;

      await productPage.navigateToProducts();

      await cartPage.addProductToCart(orderItems[0].productId);

      await cartPage.addProductToCart(orderItems[1].productId);

      await checkoutPage.proceedToCheckout();

      await checkoutPage.fillShippingDetails(customer);

      await checkoutPage.placeOrderFunc();

      await expect(checkoutPage.orderConfirmationMessage).toHaveText('Order Confirmed');

      const orderId =
        await checkoutPage.orderIdText.textContent();

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

      expect(orderBody.order.status).toBe('CONFIRMED');

      expect(orderBody.order.customer.fullName).toBe(customer.fullName);

      expect(orderBody.order.customer.address).toBe(customer.address);

      expect(orderBody.order.customer.city).toBe(customer.city);

    }
  );

});