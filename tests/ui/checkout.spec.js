const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.page');
const { ProductPage } = require('../../pages/ProductPage.page');
const { CartPage } = require('../../pages/CartPage.page');
const { CheckoutPage } = require('../../pages/CheckoutPage.page');

//1. Open the app.
test('open the app', async ({ page }) => {
    const loginPage = new LoginPage(page);  
    await loginPage.goto();   
  });


test.describe('Inventory flow', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);  
      await loginPage.goto();
      await loginPage.login(
        process.env.TEST_USERNAME,
        process.env.TEST_PASSWORD
      );
    });


//2. Login with username and password.
test('login as test_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.signinsign).toHaveText('Signed in: testuser');  

});

//3. Verify product catalog is displayed.
test('verify product category', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await expect(productPage.productheader).toHaveText('Featured Products');  
  
  });

//4. Add at least two available products to cart.  
test('add two products to cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
  });

//5. Validate cart item names, quantities, and subtotal.
test('validate the cart', async ({ page }) => { 
    //const productPage = new ProductPage(page);   
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();

    await cartPage.additemstocart(); 
    const productNames = await page.locator('.cart-item strong').allTextContents();
    expect(productNames).toContain('Wireless Headphones');
    expect(productNames).toContain('Smart Watch');

    const wirelessHeadphonesQty = await page.getByTestId('cart-qty-p-1001').textContent();
    const smartWatchQty = await page.getByTestId('cart-qty-p-1002').textContent();

    expect(wirelessHeadphonesQty).toBe('1');
    expect(smartWatchQty).toBe('1');

    const subtotalText = await page.getByTestId('cart-subtotal').textContent();
    const subtotal = parseFloat(subtotalText.replace('$', ''));
    expect(subtotal).toBe(159.98);
  
  });

//6. Proceed to checkout.
test('proceed to checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();   
  }); 
  
//7. Enter shipping details.
test('enter shipping details', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();
    await checkoutPage.addshippingdetails();  
    //await page.pause();  
  });

//8. Place order.
test('place order', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();
    await checkoutPage.addshippingdetails();  
    await checkoutPage.placeorderfunc(); 
  });

//9. Validate confirmation message.
test('Header txt validation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();
    await checkoutPage.addshippingdetails();  
    await checkoutPage.placeorderfunc();
    await expect(checkoutPage.orderconfirmtxt).toHaveText('Order Confirmed'); 
  });

//10. Capture order ID from UI.
test('Log the Order ID', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    await productPage.gotoproducts();
    await cartPage.additemstocart();  
    await checkoutPage.checkout();
    await checkoutPage.addshippingdetails();  
    await checkoutPage.placeorderfunc();
    await expect(checkoutPage.orderconfirmtxt).toHaveText('Order Confirmed');
    const orderId = await checkoutPage.orderidtxt.textContent();
    console.log('Order ID:', orderId);
  });  

});