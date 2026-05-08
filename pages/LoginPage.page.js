class LoginPage {
    constructor(page) {
      this.page = page;
  
      this.usernameInput = page.getByLabel('Username');
      this.passwordInput = page.getByLabel('Password');
      this.loginButton = page.locator("button[type='submit']");
      this.signedInUserText = page.locator(".user-chip");


    }
  
    async goto() {
        await this.page.goto('/');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }



  }
  
  module.exports = { LoginPage };