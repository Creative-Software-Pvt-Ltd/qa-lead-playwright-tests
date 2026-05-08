# CtrlPrint Playwright Automation

##  Overview

This project contains automated UI, API, and end-to-end integration tests implemented using Playwright.
It demonstrates end-to-end validation, API testing, and hybrid UI + API workflows.

---

##  Tech Stack

* Playwright (UI + API + Integration testing)
* JavaScript (Node.js)
* dotenv (environment configuration)

---

##  Project Structure

```
tests/
  ui/           → UI test cases
  api/          → API test cases
  integration/  → End-to-end UI/API validation scenarios

pages/           → Page Object Models
fixtures/        → Shared test data and fixtures

.env.example         → Environment variables example
playwright.config.js → Playwright configurations
README.md            → Project Instructions
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

## Framework Design Decisions

### Page Object Model

POM structure was used to:
- improve maintainability
- reduce selector duplication
- separate UI logic from test logic
- simplify framework scalability

### Test Design Principles

- Tests are designed to be independent
- Hard waits are avoided
- Assertions validate business outcomes
- Reusable helper methods are preferred over duplicated logic


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

### Run Integration tests only

```
npx playwright test tests/integration
```
---

## Reporting

Generate HTML report:

```
npx playwright show-report
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

* API authentication is handled using Bearer tokens
* Login API generates an access token
* Token is reused for authenticated API requests
* Sensitive credentials are managed through `.env` variables

---

## Future Improvements

- CI/CD integration using GitHub Actions
- Retry strategy for flaky environments
- Parallel execution optimization
- Visual regression testing
- Cross-browser execution pipeline
- API schema validation

---

##  Notes

* Some tests rely on a locally running backend (`localhost`)
* CI execution may fail without required services

---

##  Author

Nishantha Thilakawardana
