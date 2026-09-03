# Playwright TypeScript E2E & API Test Framework

## 1. Overview

This project is an automated testing framework built with Playwright and TypeScript.

It covers API and end-to-end testing, using reusable components and a simple test structure.

Postman collections are also included and executed with Newman.

## 2. Tech Stack

* **Playwright** — E2E and API testing
* **TypeScript** — Programming language
* **Node.js** — Runtime environment
* **Postman / Newman** — API testing
* **Git & GitHub** — Version control
* **GitHub Actions** — CI/CD

## 3. Project Structure

```text
├── src/
│   ├── api/              # API classes
│   ├── data/             # Test data and types
│   │   ├── api/
│   │   └── e2e/
│   ├── pages/            # Page Objects
│   └── utils/            # Reusable utilities
│
├── tests/
│   ├── api/              # API tests
│   └── e2e/              # E2E tests
│
├── postman/              # Postman collections and environments
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 4. Test Coverage

### Playwright API

**13 tests** covering:

* Brands API
* Products API
* Users API

### Playwright E2E

**2 test scenarios** running on:

* Chromium
* Firefox
* WebKit

Scenarios:

* Register with valid credentials
* Register with invalid credentials

### Postman

Postman API tests are stored in the `postman/` folder and executed with Newman.

```bash
npx newman run postman/AutomationTest.postman_collection.json -e postman/AutomationTest.postman_environment.json
```

## 5. Running the Tests

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all Playwright tests:

```bash
npx playwright test
```

Run API tests:

```bash
npx playwright test tests/api
```

Run E2E tests:

```bash
npx playwright test tests/e2e
```

Run a specific browser:

```bash
npx playwright test --project=chromium
```

Run Postman tests:

```bash
npx newman run postman/AutomationTest.postman_collection.json -e postman/AutomationTest.postman_environment.json
```

Open the Playwright report:

```bash
npx playwright show-report
```

## 6. CI/CD

GitHub Actions runs the automated tests on:

* Push to `main`.
* Pull requests to `main`.

The workflow has two jobs:

### Postman API Tests

* Install Node.js 20
* Install Newman
* Run Postman collection

### Playwright E2E Tests

* Install latest Node.js LTS
* Install dependencies
* Install Playwright browsers
* Run Playwright tests
* Upload the HTML report

## 7. Architecture

The project uses a simple separation of responsibilities:

* **Page Objects** — UI interactions
* **API classes** — API requests
* **Test data** — Test data and types
* **Utils** — Reusable helpers
* **Tests** — Test scenarios
* **Postman** — Additional API testing

