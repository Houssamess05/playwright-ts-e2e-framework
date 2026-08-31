# Playwright TypeScript E2E & API Test Framework

## 1. Overview

This project is an automated testing framework built with Playwright and TypeScript.

It covers both API testing and end-to-end (E2E) testing, with a focus on maintainability, reusable components, and clean test architecture.

## 2. Tech Stack

- **Playwright** — End-to-end and API testing
- **TypeScript** — Programming language
- **Node.js** — Runtime environment
- **Git & GitHub** — Version control
- **GitHub Actions** — CI/CD

## 3. Project Structure

```text
├── src/
│   ├── api/              # API client classes
│   ├── data/             # Test data and types
│   │   ├── api/
│   │   └── e2e/
│   ├── pages/            # Page Object Model
│   └── utils/            # Reusable utilities and generators
│
├── tests/
│   ├── api/              # API test suites
│   └── e2e/              # End-to-end test suites
│
├── postman/              # Postman collections
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 4. Test Coverage

The framework currently includes **19 test executions across 4 test files**, covering both API and end-to-end testing.

### API Testing

**13 test cases** covering:

- **Brands API**
  - `GET /api/brandsList` — Retrieve brands
  - `PUT /api/brandsList` — Update a brand

- **Products API**
  - `GET /api/productsList` — Retrieve products
  - `POST /api/productsList` — Create a product
  - `POST /api/searchProduct` — Search for a product
  - `POST /api/searchProduct` — Validate missing `search_product` parameter

- **Users API**
  - `POST /api/verifyLogin` — Verify login with valid credentials
  - `POST /api/verifyLogin` — Validate missing email parameter
  - `DELETE /api/verifyLogin` — Validate unsupported HTTP method
  - `POST /api/createAccount` — Create a user account
  - `DELETE /api/deleteAccount` — Delete a user account
  - `PUT /api/updateAccount` — Update a user account
  - `GET /api/getUserDetailByEmail` — Retrieve user account details

### End-to-End Testing

**2 test scenarios** executed across **Chromium, Firefox and WebKit**:

- **User Registration**
  - Register with valid credentials
  - Register with invalid credentials — Missing password

### Test Summary

| Test Type | Test Cases | Browsers | Executions |
|---|---:|---|---:|
| API | 13 | API | 13 |
| E2E | 2 | Chromium, Firefox, WebKit | 6 |
| **Total** | **15** | — | **19** |

## 5. Running the Tests

Install the project dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the complete test suite:

```bash
npx playwright test
```

Run only API tests:

```bash
npx playwright test tests/api
```

Run only E2E tests:

```bash
npx playwright test tests/e2e
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/e2e/Register.spec.ts
```

## 6. Test Reports

After running the tests, Playwright generates an HTML report.

Open the report with:

```bash
npx playwright show-report
```

The report provides detailed information about test execution, including passed and failed tests, execution time, and test results.

## 7. CI/CD

The framework uses **GitHub Actions** to automatically execute the test suite.

Tests are triggered on:

- Pushes to the configured branch
- Pull requests

The CI pipeline:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Installs Playwright browsers
5. Executes the complete test suite
6. Uploads the Playwright HTML report as a workflow artifact

The pipeline currently executes **19 test executions** using **2 workers**.

## 8. Architecture

The framework separates different responsibilities to keep the test suite maintainable and reusable:

- **Page Objects** encapsulate UI interactions.
- **API classes** encapsulate API requests.
- **Test data** is separated from test logic.
- **Utilities** provide reusable helper functions.
- **Tests** focus on validating application behaviour.

This structure allows test logic to remain clean while reducing duplication across the framework.
