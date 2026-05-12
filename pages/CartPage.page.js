export class CartPage {
    constructor(page) {
      this.page = page;
  
      this.cartItemNames = page.locator('.cart-item strong');
      this.subtotalAmount = page.getByTestId('cart-subtotal');
      this.removeButtons = page.getByRole('button', { name: 'Remove' });
    }
  
    getAddToCartButton(productId) {
      return this.page.getByTestId(`add-to-cart-${productId}`);
    }
  
    getCartItemQuantity(productId) {
      return this.page.getByTestId(`cart-qty-${productId}`);
    }
  
    async addProductToCart(productId) {
      await this.getAddToCartButton(productId).click();
    }
  }