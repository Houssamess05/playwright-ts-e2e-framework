# Playwright TypeScript E2E & API Test Framework

## 1. Overview

This project is an automated testing framework built with Playwright and TypeScript. It covers API and end-to-end (E2E) testing for Automation Exercise, with reusable API clients, Page Objects, test data, and utilities.

## 2. Tech Stack

* **Playwright Test** — E2E and API testing
* **TypeScript** — Programming language
* **Node.js 24** — Runtime used in CI
* **Faker.js** — Dynamic test data generation
* **GitHub Actions** — CI/CD

## 3. Project Structure

```text
├── src/
│   ├── api/                  # API client classes
│   ├── data/
│   │   ├── api/              # API test data and types
│   │   ├── common/           # Shared data and types
│   │   └── e2e/              # E2E test data and types
│   ├── fixtures/             # Reusable Playwright fixtures
│   ├── pages/                # Page Objects
│   └── utils/                # Reusable utilities and data generators
│
├── tests/
│   ├── api/                  # API tests
│   └── e2e/                  # Browser-based E2E tests
│
├── .github/workflows/        # GitHub Actions workflows
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 4. Test Coverage

### Playwright API

**13 tests** covering:

* **Brands** — Retrieve brands and verify unsupported update requests.
* **Products** — Retrieve and validate products, search for products, and verify unsupported or invalid requests.
* **Users** — Verify login, create/update/delete accounts, and retrieve account details.

### Playwright E2E

**2 scenarios** running on Chromium, Firefox, and WebKit:

* Register an account with valid credentials.
* Attempt registration without a password and verify the browser's required-field validation.

## 5. Running the Tests

Install dependencies (Node.js 24 is used by the CI workflow):

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests (API and E2E):

```bash
npm test
```

Run API tests:

```bash
npx playwright test tests/api
```

Run E2E tests:

```bash
npx playwright test tests/e2e
```

Run E2E tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests with the browser UI or in headed mode:

```bash
npm run test:ui
npm run test:headed
```

Open the HTML report:

```bash
npm run test:report
```

## 6. CI/CD

GitHub Actions runs on pushes and pull requests targeting `main`. The workflow has two jobs:

### API Tests

* Set up Node.js 24 and install dependencies with `npm ci`.
* Run `npx playwright test tests/api`.

### Playwright E2E Tests

* Set up Node.js 24, install dependencies, and install Playwright browsers with system dependencies.
* Run `npx playwright test tests/e2e`.
* Upload the HTML report as a workflow artifact, retained for 30 days.

## 7. Architecture

The project uses a simple separation of responsibilities:

* **Page Objects** — Encapsulate browser interactions and page behavior.
* **API clients** — Encapsulate requests to the brands, products, and users endpoints.
* **Fixtures** — Provide reusable test setup, including authenticated-page setup.
* **Test data and types** — Keep API, E2E, and shared data organized and typed.
* **Utilities** — Generate unique, realistic user data for tests.
* **Tests** — Define API checks and browser-based user scenarios.

