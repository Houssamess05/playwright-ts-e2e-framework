1) Overview
   
This project is an automated testing framework built with Playwright and TypeScript.

2) Tech Stack
   
- **Playwright** — End-to-end and API testing
- **TypeScript** — Programming language
- **Node.js** — Runtime environment
- **Git & GitHub** — Version control
- **GitHub Actions** — CI/CD

3) Project Structure

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

4) Test Coverage
   
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
| **Total** | **15** | | **19** |
