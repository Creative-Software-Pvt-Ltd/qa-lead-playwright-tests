class CartPage {
    constructor(page) {
      this.page = page;
  
      this.addtocart1 = page.locator("button[data-testid='add-to-cart-p-1001']");
      this.addtocart2 = page.locator("button[data-testid='add-to-cart-p-1002']");

      
    }
  

    
    async additemstocart() {    
        await this.addtocart1.click();
        await this.addtocart2.click();
    }


  }
  
  module.exports = { CartPage };