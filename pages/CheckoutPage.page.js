export class CheckoutPage {
    constructor(page) {
      this.page = page;
  
      this.checkoutButton = page.getByTestId('checkout-button');  
      this.placeOrderButton = page.getByTestId('place-order-button');
      this.fullNameInput = page.getByLabel('Full name');
      this.addressInput = page.getByLabel('Address');
      this.cityInput = page.getByLabel('City');  
      this.orderConfirmationMessage = page.getByRole('heading', {name: 'Order Confirmed'}); 
      this.orderIdText =page.getByTestId('order-id');
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