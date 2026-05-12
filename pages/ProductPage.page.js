export class ProductPage {
    constructor(page) {
      this.page = page;
  
      this.shopProductsButton = page.getByRole('link', { name: 'Shop Products' });  
      this.productsHeader = page.getByRole('heading', {name: 'Featured Products'});
    }
  
    async navigateToProducts() {
      await this.shopProductsButton.click();
    }
  }