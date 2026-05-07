class ProductPage {
    constructor(page) {
      this.page = page;
  
      this.shopproductbtn = page.locator(".hero-button");
      this.productheader = page.locator("section[id='products'] h2");
      this.addtocart1 = page.locator("button[data-testid='add-to-cart-p-1001']");
      this.addtocart2 = page.locator("button[data-testid='add-to-cart-p-1002']");

      
    }
  

    async gotoproducts() {
        await this.shopproductbtn.click();
    }

    


  }
  
  module.exports = { ProductPage };