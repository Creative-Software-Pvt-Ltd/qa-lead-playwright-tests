import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.page.js';
import { ProductPage } from '../../pages/ProductPage.page.js';
import { CartPage } from '../../pages/CartPage.page.js';
import { CheckoutPage } from '../../pages/CheckoutPage.page.js';
import {customer,orderItems} from '../../fixtures/testData.js';


// 1. Open the app.
test('open the app', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();

});


test.describe('Inventory flow', () => {

  let pages;

  async function prepareCart() {
    await pages.productPage.navigateToProducts();
    await pages.cartPage.addProductToCart(orderItems[0].productId);
    await pages.cartPage.addProductToCart(orderItems[1].productId);
  }

  async function completeCheckoutFlow() {

    await prepareCart();
    await pages.checkoutPage.proceedToCheckout();
    await pages.checkoutPage.fillShippingDetails(customer);
    await pages.checkoutPage.placeOrderFunc();
  }


  test.beforeEach(async ({ page }) => {

    pages = {
      loginPage: new LoginPage(page),
      productPage: new ProductPage(page),
      cartPage: new CartPage(page),
      checkoutPage: new CheckoutPage(page)
    };

    await pages.loginPage.goto();

    await pages.loginPage.login(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);

  });


  // 2. Login with username and password.
  test('login as test_user', async () => {

    await expect(pages.loginPage.signedInUserText).toHaveText(`Signed in: ${process.env.TEST_USERNAME}`);

  });


  // 3. Verify product catalog is displayed.
  test('verify product category', async () => {

    await pages.productPage.navigateToProducts();
    await expect(pages.productPage.productsHeader).toHaveText('Featured Products');

  });


  // 4. Add at least two available products to cart.
  test('add two products to cart', async () => {

    await prepareCart();
    await expect(pages.cartPage.removeButtons).toHaveCount(2);

  });


  // 5. Validate cart item names, quantities, and subtotal.
  test('validate the cart', async () => {

    await prepareCart();
    const productNames =await pages.cartPage.cartItemNames.allTextContents();

    expect(productNames).toContain(orderItems[0].name);
    expect(productNames).toContain(orderItems[1].name);


    const wirelessHeadphonesQty = Number(
      await pages.cartPage.getCartItemQuantity(orderItems[0].productId).textContent()
    );

    const smartWatchQty = Number(
      await pages.cartPage.getCartItemQuantity(orderItems[1].productId).textContent()
    );

    expect(wirelessHeadphonesQty).toBe(orderItems[0].quantity);

    expect(smartWatchQty).toBe(orderItems[1].quantity);


    const subtotalText =
      await pages.cartPage.subtotalAmount.textContent();

    const subtotal = parseFloat(
      subtotalText.replace('$', '')
    );

    const expectedSubtotal = orderItems[0].quantity * orderItems[0].price + orderItems[1].quantity * orderItems[1].price;

    expect(subtotal).toBe(expectedSubtotal);

  });


  // 6. Proceed to checkout.
  test('proceed to checkout', async () => {

    await prepareCart();
    await pages.checkoutPage.proceedToCheckout();

  });


  // 7. Enter shipping details.
  test('enter shipping details', async () => {

    await prepareCart();
    await pages.checkoutPage.proceedToCheckout();
    await pages.checkoutPage.fillShippingDetails(customer);

  });


  // 8. Place order.
  test('place order', async () => {

    await completeCheckoutFlow();

  });


  // 9. Validate confirmation message.
  test('Header txt validation', async () => {

    await completeCheckoutFlow();
    await expect(pages.checkoutPage.orderConfirmationMessage).toHaveText('Order Confirmed');

  });


  // 10. Capture order ID from UI.
  test('Log the Order ID', async () => {

    await completeCheckoutFlow();
    const orderId =
      await pages.checkoutPage.orderIdText.textContent();

    expect(orderId).toMatch(/^ORD-/);

  });

});