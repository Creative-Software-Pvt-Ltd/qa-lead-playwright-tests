class CheckoutPage {
    constructor(page) {
      this.page = page; 
      this.checkoutButton = page.locator(".checkout");
      this.placeOrderButton = page.locator("button[data-testid='place-order-button']");
      this.fullNameInput = page.getByLabel('Full name');
      this.addressInput = page.getByLabel('Address');
      this.cityInput = page.getByLabel('City');
      this.orderConfirmationMessage = page.locator("section[class='confirmation'] h2");
      this.orderIdText = page.locator("strong[data-testid='order-id']")

    }
  
    
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async fillShippingDetails(customer) {
        await this.fullNameInput.fill(customer.fullName);
        await this.addressInput.fill(customer.address);
        await this.cityInput.fill(customer.city);
    }

    async placeOrderFunc() {
        await this.placeOrderButton.click();
    }

  }
  
  module.exports = { CheckoutPage };