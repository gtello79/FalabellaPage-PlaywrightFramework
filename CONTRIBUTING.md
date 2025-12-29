# Contributing to Falabella Testing Framework

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/FalabellaPage-PlaywrightFramework.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Install Playwright browsers: `npx playwright install`

## Development Workflow

### Before Making Changes

1. Ensure all tests pass: `npm test tests/framework.spec.ts`
2. Check TypeScript compilation: `npm run compile`

### Making Changes

1. Follow the existing code structure and patterns
2. Use the Page Object Model pattern for new pages
3. Write tests for new functionality
4. Keep changes focused and atomic

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Use meaningful variable and function names
- Keep functions small and focused

### TypeScript Guidelines

```typescript
// Good: Clear type definitions
async getProductTitle(): Promise<string | null> {
  return await this.getText(this.productTitle);
}

// Good: Descriptive parameter names
async search(searchTerm: string): Promise<void> {
  await this.fill(this.searchBox, searchTerm);
}

// Good: Use readonly for locators
readonly searchBox: Locator;
```

### Page Object Guidelines

1. **Locator Definition**: Define all locators in the constructor
2. **Action Methods**: Create methods for user actions
3. **No Assertions**: Keep assertions in test files, not page objects
4. **Descriptive Names**: Use clear, action-oriented method names

Example:
```typescript
// Good ✅
async addToCart(): Promise<void> {
  await this.click(this.addToCartButton);
}

// Bad ❌
async clickButton(): Promise<void> {
  await this.click(this.addToCartButton);
}
```

### Test Guidelines

1. **Test Structure**: Follow Arrange-Act-Assert pattern
2. **Descriptive Names**: Test names should describe what is being tested
3. **Independence**: Each test should be independent
4. **Setup and Teardown**: Use beforeEach/afterEach for common setup

Example:
```typescript
test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display results for valid search term', async () => {
    // Arrange
    const searchTerm = 'laptop';
    
    // Act
    await homePage.search(searchTerm);
    
    // Assert
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBeTruthy();
  });
});
```

## Project Structure

```
├── src/
│   ├── pages/          # Page Object Models
│   └── utils/          # Utility functions
├── tests/              # Test specifications
├── .github/            # GitHub workflows
├── playwright.config.ts # Playwright configuration
└── tsconfig.json       # TypeScript configuration
```

## Adding New Features

### Adding a New Page Object

1. Create a new file in `src/pages/`
2. Extend `BasePage`
3. Define locators in constructor
4. Add action methods
5. Export from `src/pages/index.ts`
6. Add tests in `tests/`

### Adding Utility Functions

1. Add function to `src/utils/helpers.ts`
2. Export the function
3. Add tests to validate functionality
4. Update documentation

### Adding Tests

1. Create test file in `tests/` directory
2. Use `.spec.ts` suffix
3. Import required page objects
4. Follow existing test patterns
5. Ensure tests are independent

## Testing Your Changes

### Run TypeScript Compilation
```bash
npm run compile
```

### Run Framework Tests
```bash
npm test tests/framework.spec.ts
```

### Run Specific Test File
```bash
npm test tests/your-test.spec.ts
```

### Debug Tests
```bash
npm run test:debug
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(pages): add checkout page object

Add new CheckoutPage class with payment and shipping methods

Closes #123
```

```
fix(search): correct product count selector

Update selector to match current DOM structure

Fixes #456
```

## Pull Request Process

1. Update documentation for any new features
2. Ensure all tests pass
3. Update TESTING_GUIDE.md if needed
4. Create a pull request with a clear title and description
5. Link related issues
6. Wait for code review

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] TypeScript compilation successful
```

## Code Review

### What We Look For

- Code quality and readability
- Test coverage
- Documentation completeness
- Adherence to project patterns
- No breaking changes (unless discussed)

### Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. Address feedback or discuss concerns
4. Maintainer merges when approved

## Questions or Issues?

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

## Thank You!

Your contributions help make this project better for everyone!
