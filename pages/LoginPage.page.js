export class LoginPage {
    constructor(page) {
      this.page = page;
  
      this.usernameInput = page.getByLabel('Username');
      this.passwordInput = page.getByLabel('Password');  
      this.loginButton = page.getByRole('button', { name: 'Login' }); 
      this.signedInUserText = page.getByTestId('logged-in-user');
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