//prompt for planner
Explore https://www.saucedemo.com.

Cover the login flow with these scenarios:
- standard_user (successful login)
- locked_out_user (shows locked error)
- Empty username submission
- Empty password submission
- Invalid credentials

All passwords are: secret_sauce

Save the plan to specs/saucedemo-login.md

//prompt for generator
Use scenario 1.1 from specs/saucedemo-login.md.

Context:
- App under test: https://www.saucedemo.com
- Credentials: load from tests/data/users.json (users.standard)
- LoginPage does not exist yet — create it at src/pages/LoginPage.ts
- InventoryPage does not exist yet — create it at src/pages/InventoryPage.ts

Rules:
- Import test from src/fixtures/base.ts, NOT from @playwright/test
- Both page objects must extend BasePage
- Locators: getByRole > getByLabel > getByTestId. No CSS, no XPath.
- No page.waitForTimeout
- Tag the test with @smoke @critical

Task:
1. Create the two page objects
2. Generate the test at tests/auth/standard-login.spec.ts
3. Run the test and confirm it passes
4. Report the result

//prompt for healer
The test at #tests/auth/standard-login.spec.ts is failing.

Diagnose and fix following your rules:

1. Run the test to reproduce the failure
2. Read the error output carefully
3. Open the app in a live browser to inspect the actual DOM
4. Determine root cause
5. Apply the minimum-viable fix
6. Preserve assertion intent — do NOT weaken any assertion
7. Do NOT add waitForTimeout
8. Do NOT skip the test
9. Re-run twice to confirm stability
10. Produce a final report explaining what you did and why