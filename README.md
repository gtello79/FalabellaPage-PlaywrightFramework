# Falabella Page - Playwright Testing Framework

A comprehensive testing framework for the Falabella e-commerce website using Playwright with TypeScript, implementing the Page Object Model (POM) design pattern.

## 📋 Overview

This framework provides a structured approach to automated testing of the Falabella website. It uses the Page Object Model pattern to separate page structure from test logic, making tests more maintainable and readable.

## 🏗️ Architecture

The framework follows the **Page Object Model (POM)** pattern with the following structure:

```
FalabellaPage-PlaywrightFramework/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Base class with common actions
│   │   ├── HomePage.ts     # Home page object
│   │   ├── SearchPage.ts   # Search results page object
│   │   ├── ProductPage.ts  # Product detail page object
│   │   └── index.ts        # Page objects exports
│   └── utils/              # Utility functions
│       └── helpers.ts      # Helper functions
├── tests/                  # Test specifications
│   ├── homePage.spec.ts    # Home page tests
│   ├── search.spec.ts      # Search functionality tests
│   ├── product.spec.ts     # Product page tests
│   └── e2e.spec.ts         # End-to-end tests
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gtello79/FalabellaPage-PlaywrightFramework.git
cd FalabellaPage-PlaywrightFramework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with browser UI)
```bash
npm run test:headed
```

### Run tests in specific browsers
```bash
npm run test:chromium    # Chrome/Edge
npm run test:firefox     # Firefox
npm run test:webkit      # Safari
npm run test:mobile      # Mobile Chrome and Safari
```

### Run specific test suites
```bash
npm run test:home        # Home page tests
npm run test:search      # Search tests
npm run test:product     # Product page tests
npm run test:e2e         # End-to-end tests
```

### Debug tests
```bash
npm run test:debug       # Debug mode with Playwright Inspector
npm run test:ui          # Run with Playwright UI Mode
```

### View test report
```bash
npm run test:report      # View HTML report
```

## 📝 Page Object Model Structure

### BasePage
Base class that all page objects inherit from. Provides common actions:
- Navigation
- Element interactions (click, fill, type)
- Visibility checks
- Waiting mechanisms
- Screenshot capabilities

### HomePage
Represents the Falabella home page with actions:
- `navigate()` - Navigate to home page
- `search(searchTerm)` - Perform a search
- `clickLogo()` - Click on logo
- `goToShoppingCart()` - Navigate to cart
- `isSearchBoxVisible()` - Check search box visibility

### SearchPage
Represents search results page with actions:
- `getProductCount()` - Get number of products
- `clickProductByIndex(index)` - Click on a product
- `filterByPrice(min, max)` - Apply price filter
- `filterByBrand(brand)` - Apply brand filter
- `sortBy(option)` - Sort results
- `hasResults()` - Check if results exist

### ProductPage
Represents product detail page with actions:
- `getProductTitle()` - Get product title
- `getProductPrice()` - Get product price
- `addToCart()` - Add product to cart
- `setQuantity(quantity)` - Set quantity
- `selectColor(color)` - Select color variant
- `selectSize(size)` - Select size
- `isProductAvailable()` - Check availability

## 🔧 Configuration

### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Base URL
- Timeout settings
- Browser configurations
- Test directory
- Reporter options
- Retry logic

### TypeScript Configuration
Edit `tsconfig.json` for TypeScript compiler options.

## 📊 Test Reporting

After running tests, view the HTML report:
```bash
npm run test:report
```

The report includes:
- Test results
- Screenshots on failure
- Videos on failure
- Trace files for debugging

## 🛠️ Writing New Tests

### Example test using page objects:

```typescript
import { test, expect } from '@playwright/test';
import { HomePage, SearchPage } from '../src/pages';

test('search for product', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  
  // Navigate to home page
  await homePage.navigate();
  
  // Perform search
  await homePage.search('laptop');
  
  // Verify results
  const hasResults = await searchPage.hasResults();
  expect(hasResults).toBeTruthy();
});
```

## 📚 Best Practices

1. **Use Page Objects**: All page interactions should go through page objects
2. **Single Responsibility**: Each page object represents one page/component
3. **Descriptive Names**: Use clear, descriptive method names
4. **Wait Strategies**: Use appropriate wait strategies (element visibility, page load)
5. **Assertions in Tests**: Keep assertions in test files, not in page objects
6. **DRY Principle**: Reuse common actions through BasePage
7. **Independent Tests**: Each test should be independent and able to run in isolation

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

ISC

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Falabella Website](https://www.falabella.com)