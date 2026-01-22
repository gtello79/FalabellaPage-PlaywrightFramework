import { test, expect } from '@playwright/test';

const repoOwner = 'gtello79';
const repoName = 'FalabellaPage-PlaywrightFramework';

test('Should get issues from a repository', async ({ request }) => {

    const response = await request.get(`repos/${repoOwner}/${repoName}/issues`);
    let statusCode = response.status();

    expect(statusCode).toBe(200);

    const issues = await response.json();

    expect(Array.isArray(issues)).toBe(true);
    expect(issues.length).toBeGreaterThan(0);
});


test('Should create a new issue in the repository', async ({ request }) => {

    const response = await request.post(`repos/${repoOwner}/${repoName}/issues`, {
        data: {
            title: '[FeatureTest] Issue from Playwright',
            body: 'This is a test issue created by Playwright API testing.'
        }
    });
    
    let statusCode = response.status();
    expect(response.ok()).toBeTruthy();

    
    expect(statusCode).toBe(201);

    const createdIssue = await response.json();

    expect(createdIssue.title).toBe('[FeatureTest] Issue from Playwright');
    expect(createdIssue.body).toBe('This is a test issue created by Playwright API testing.');
    expect(createdIssue).toHaveProperty('number');
});