# CtrlPrint Playwright Automation

##  Overview

This project contains automated UI, API and Integration tests implemented using Playwright.
It demonstrates end-to-end validation, API testing, and hybrid UI + API workflows.

---

##  Tech Stack

* Playwright (UI + API testing)
* JavaScript (Node.js)
* dotenv (environment configuration)

---

##  Project Structure

```
tests/
  ui/        → UI test cases
  api/       → API test cases
  integration/       → Integration test cases
pages/       → Page Object Models
fixtures/
.env         → Environment variables
```

---

##  Setup

### 1. Install dependencies

```
npm install
```

### 2. Configure environment

Create a `.env` file:

```
FRONTEND_BASE_URL=
API_BASE_URL=
TEST_USERNAME=
TEST_PASSWORD=
```

---

##  Running Tests

### Run all tests

```
npx playwright test
```

### Run UI tests only

```
npx playwright test tests/ui
```

### Run API tests only

```
npx playwright test tests/api
```

---
### Run Integration tests only

```
npx playwright test tests/integration
```

---

##  Test Coverage

## UI test

Automate successful checkout:

1. Open the app.
2. Login with username and password.
3. Verify product catalog is displayed.
4. Add at least two available products to cart.
5. Validate cart item names, quantities, and subtotal.
6. Proceed to checkout.
7. Enter shipping details.
8. Place order.
9. Validate confirmation message.
10. Capture order ID from UI.

## API tests

Automate:

1. Successful login.
2. Invalid login.
3. Fetch products.
4. Create order with a valid token.
5. One negative case: missing token, invalid product ID, invalid quantity, or out-of-stock product.

## UI + API integration test

After placing an order through UI:

1. Fetch the order through API.
2. Validate order ID, customer details, items, quantities, total, and status.

---

##  Authentication Handling

* Basic authentication for API requests

---

##  Notes

* Some tests rely on a locally running backend (`localhost`)
* CI execution may fail without required services

---

##  Author

Nishantha Thilakawardana
