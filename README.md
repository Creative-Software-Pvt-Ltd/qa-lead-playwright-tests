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
utils/       → Reusable API helpers & utilities
data/        → Test data (e.g., generated IDs)
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
BASE_URL=http://localhost:8080
BASIC_USER=superadmin
BASIC_PASS=ulan
```

---

##  Running Tests

### Run all tests

```
npx playwright test
```

### Run UI tests only

```
npx playwright test tests/UI
```

### Run API tests only

```
npx playwright test tests/API
```

---

##  Test Coverage

### UI Tests

* Login validation
* Navigation flows
* Form interactions
* End-to-end user actions

### API Tests

* Create / retrieve / process resources
* Response validation
* Authentication handling (Basic + session-based)

### Integration Tests

* Data created via API validated in UI

---

##  Authentication Handling

* Basic authentication for API requests
* Session-based authentication handled via Playwright browser context

---

##  Notes

* Some tests rely on a locally running backend (`localhost`)
* CI execution may fail without required services
* API behavior may depend on application state (e.g., visit processing)

---

##  Highlights

* Clean Page Object Model implementation
* Reusable API client structure
* Dynamic data handling and persistence
* Hybrid UI + API validation approach

---

##  Author

Nishantha Thilakawardana
