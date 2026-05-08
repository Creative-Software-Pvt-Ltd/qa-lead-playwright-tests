class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItemNames = page.locator(".cart-item strong");
      this.subtotalAmount = page.locator("strong[data-testid='cart-subtotal']");
      this.removeButtons = page.locator(".cart-item button");
      
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
  
  module.exports = { CartPage };