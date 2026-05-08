class ProductPage {
    constructor(page) {
      this.page = page;
  
      this.shopProductsButton = page.locator(".hero-button");
      this.productsHeader = page.locator("section[id='products'] h2");
     
    }
  

    async navigateToProducts() {
        await this.shopProductsButton.click();
    }   
}
  
  module.exports = { ProductPage };