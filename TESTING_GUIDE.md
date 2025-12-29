# Testing Guide

## Test Environment

### Local Testing
When running tests locally with internet access, all tests will run against the live Falabella website.

### CI/CD Environment
In restricted CI/CD environments without internet access, the framework validation tests (`tests/framework.spec.ts`) can be used to verify the framework structure and utilities.

## Test Categories

### 1. Framework Validation Tests (`framework.spec.ts`)
These tests validate the framework structure and don't require internet access:
- Page object imports
- Utility function imports
- Helper function functionality

Run with:
```bash
npm test tests/framework.spec.ts
```

### 2. Home Page Tests (`homePage.spec.ts`)
Tests for the Falabella home page functionality:
- Page loading
- Logo visibility
- Search box functionality
- Navigation actions

**Note:** Requires internet access to falabella.com

### 3. Search Tests (`search.spec.ts`)
Tests for search functionality:
- Search results display
- Product card interactions
- Result navigation

**Note:** Requires internet access to falabella.com

### 4. Product Page Tests (`product.spec.ts`)
Tests for product detail pages:
- Product information display
- Price display
- Image loading
- Add to cart functionality

**Note:** Requires internet access to falabella.com

### 5. End-to-End Tests (`e2e.spec.ts`)
Complete user journey tests:
- Full shopping flow from home to product
- Multi-step scenarios

**Note:** Requires internet access to falabella.com

## Page Object Model Pattern

### What is POM?
The Page Object Model (POM) is a design pattern that:
- Creates an object repository for web UI elements
- Reduces code duplication
- Improves test maintenance
- Separates test logic from page structure

### Structure

```
BasePage (Abstract)
├── Common methods (click, fill, waitForElement, etc.)
│
├── HomePage extends BasePage
│   ├── search()
│   ├── clickLogo()
│   └── goToShoppingCart()
│
├── SearchPage extends BasePage
│   ├── getProductCount()
│   ├── clickProductByIndex()
│   └── filterByPrice()
│
└── ProductPage extends BasePage
    ├── getProductTitle()
    ├── addToCart()
    └── selectSize()
```

### Benefits
1. **Maintainability**: Changes to page structure only require updates to page objects
2. **Reusability**: Page methods can be reused across multiple tests
3. **Readability**: Tests read like user actions
4. **Separation of Concerns**: Test logic is separate from page interaction logic

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('My Test Suite', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('my test case', async () => {
    // Arrange - Set up test data
    const searchTerm = 'laptop';
    
    // Act - Perform actions
    await homePage.search(searchTerm);
    
    // Assert - Verify results
    const url = await homePage.getCurrentURL();
    expect(url).toContain('search');
  });
});
```

### Best Practices

1. **Use Page Objects**
   ```typescript
   // Good ✅
   await homePage.search('laptop');
   
   // Bad ❌
   await page.locator('input[id="search"]').fill('laptop');
   ```

2. **Keep Assertions in Tests**
   ```typescript
   // Good ✅
   const title = await productPage.getProductTitle();
   expect(title).toBeTruthy();
   
   // Bad ❌ (don't put assertions in page objects)
   async getProductTitle() {
     const title = await this.getText(this.productTitle);
     expect(title).toBeTruthy(); // Wrong!
     return title;
   }
   ```

3. **Use Descriptive Test Names**
   ```typescript
   // Good ✅
   test('should display product price when product page loads', async () => {
   
   // Bad ❌
   test('test1', async () => {
   ```

4. **Independent Tests**
   - Each test should be able to run independently
   - Don't rely on state from previous tests
   - Use beforeEach for setup

5. **Wait Strategies**
   ```typescript
   // Wait for element to be visible
   await homePage.waitForElement(locator);
   
   // Wait for page to load
   await homePage.waitForPageLoad();
   
   // Wait for URL change
   await page.waitForURL(/pattern/);
   ```

## Debugging Tests

### Debug Mode
Run tests with Playwright Inspector:
```bash
npm run test:debug
```

### UI Mode
Run tests with interactive UI:
```bash
npm run test:ui
```

### View Test Report
After test execution:
```bash
npm run test:report
```

### Screenshots and Videos
- Screenshots are automatically taken on failure
- Videos are recorded on failure
- Find them in `test-results/` directory

### Traces
- Traces are captured on retry
- View with: `npx playwright show-trace path/to/trace.zip`

## Adding New Page Objects

1. Create a new file in `src/pages/`
2. Extend BasePage
3. Define locators in constructor
4. Create action methods
5. Export from `src/pages/index.ts`

Example:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly continueButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.continueButton = page.locator('button:has-text("Continue")');
  }
  
  async proceedToCheckout(): Promise<void> {
    await this.click(this.continueButton);
  }
}
```

## Utility Functions

Located in `src/utils/helpers.ts`:

- `generateRandomString(length)` - Generate random alphanumeric string
- `generateRandomEmail()` - Generate test email address
- `parsePriceToNumber(priceString)` - Convert price string to number
- `getCurrentDate()` - Get current date in YYYY-MM-DD format
- `getTimestamp()` - Get current timestamp
- `wait(ms)` - Wait for specified milliseconds

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests fail with ERR_NAME_NOT_RESOLVED
- Check internet connectivity
- Verify the baseURL in `playwright.config.ts`
- Ensure the website is accessible

### Element not found
- Check if selectors in page objects are up to date
- Use Playwright Inspector to debug: `npm run test:debug`
- Verify element is visible before interaction

### Timeout errors
- Increase timeout in playwright.config.ts
- Check if page is loading correctly
- Verify network conditions

### TypeScript compilation errors
- Run `npm run compile` to check for errors
- Verify tsconfig.json settings
- Ensure all imports are correct
