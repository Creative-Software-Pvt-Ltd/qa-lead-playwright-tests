//const { customer } = require('../fixtures/testData');

class CheckoutPage {
    constructor(page) {
      this.page = page; 
      this.checkoutbtn = page.locator(".checkout");
      this.placeorder = page.locator("button[data-testid='place-order-button']");
      this.fullnameinput = page.locator("input[value='Test User']");
      this.addressinput = page.locator("input[value='123 Test Street']");
      this.cityinput = page.locator("input[value='London']");
      this.orderconfirmtxt = page.locator("section[class='confirmation'] h2");
      this.orderidtxt = page.locator("strong[data-testid='order-id']")

    }
  
    
    async checkout() {
        await this.checkoutbtn.click();
        //await this.placeorder.click();
    }

    async addshippingdetails() {
        await this.fullnameinput.fill('Nishantha');
        await this.addressinput.fill('75, ABC road');
        await this.cityinput.fill('Colombo');
        //await this.fullnameinput.fill(customer.fullName);
        //await this.addressinput.fill(customer.address);
        //await this.cityinput.fill(customer.city);
    }

    async placeorderfunc() {
        await this.placeorder.click();
    }



  }
  
  module.exports = { CheckoutPage };