class LoginPage {
    constructor(page) {
      this.page = page;
  
      this.usernameInput = page.locator("input[placeholder='testuser']");
      this.passwordInput = page.locator("input[placeholder='password123']");
      this.loginButton = page.locator("button[type='submit']");
      this.signinsign = page.locator(".user-chip");


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