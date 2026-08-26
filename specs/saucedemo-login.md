# Test Plan: SauceDemo Login Flow

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-08-26

## Overview

The SauceDemo application provides a test sandbox with a login form. This plan covers five distinct login scenarios including successful authentication, account lockout, and validation errors. The login page displays a list of valid test usernames and a common password to use for testing.

## Preconditions

- Browser is navigated to https://www.saucedemo.com
- Login page is fully loaded and interactive
- Username and Password input fields are visible and enabled
- Login button is clickable

## Scenarios

### Scenario 1.1 — Standard user successful login
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on the login page with empty fields
- **Steps:**
  1. Enter "standard_user" in the Username field — expected: text appears in input
  2. Enter "secret_sauce" in the Password field — expected: password masked with dots/circles
  3. Click the Login button — expected: page navigates to products page, URL changes to /inventory
  4. Verify products grid is displayed — expected: at least one product item is visible with name, price, and "Add to cart" button
- **Assertions:**
  - URL contains /inventory
  - Products page title or header is visible
  - At least one product container is present
- **Edge cases considered:** 
  - Case sensitivity of username (test with "Standard_User" if needed)
  - Extra whitespace in credentials

### Scenario 1.2 — Locked out user shows locked error
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** User is on the login page with empty fields
- **Steps:**
  1. Enter "locked_out_user" in the Username field — expected: text appears in input
  2. Enter "secret_sauce" in the Password field — expected: password masked
  3. Click the Login button — expected: page remains on login form, error message displays
  4. Verify error message is present — expected: message indicates account is locked
- **Assertions:**
  - Error message is visible on the page
  - Error message text contains "locked" (case-insensitive)
  - User remains on login page (URL still /index.html or /)
  - Username and Password fields still contain the attempted values or are cleared based on implementation
- **Edge cases considered:**
  - Multiple locked-out attempts
  - Error message styling/visibility

### Scenario 1.3 — Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page with empty fields
- **Steps:**
  1. Leave Username field empty
  2. Enter "secret_sauce" in the Password field — expected: password masked
  3. Click the Login button — expected: page remains on login form, validation error displays
  4. Verify error message is present — expected: message indicates username is required
- **Assertions:**
  - Error message is visible on the page
  - Error message indicates missing or required username
  - User remains on login page
  - Focus may return to Username field (if implemented)
- **Edge cases considered:**
  - Whitespace-only username
  - Copy-pasted empty value

### Scenario 1.4 — Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page with empty fields
- **Steps:**
  1. Enter "standard_user" in the Username field — expected: text appears in input
  2. Leave Password field empty
  3. Click the Login button — expected: page remains on login form, validation error displays
  4. Verify error message is present — expected: message indicates password is required
- **Assertions:**
  - Error message is visible on the page
  - Error message indicates missing or required password
  - User remains on login page
  - Focus may return to Password field (if implemented)
- **Edge cases considered:**
  - Whitespace-only password
  - Tab through fields without entering password

### Scenario 1.5 — Invalid credentials rejection
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page with empty fields
- **Steps:**
  1. Enter "invalid_user" in the Username field — expected: text appears in input
  2. Enter "wrong_password" in the Password field — expected: password masked
  3. Click the Login button — expected: page remains on login form, error message displays
  4. Verify error message is present — expected: message indicates invalid username or password
- **Assertions:**
  - Error message is visible on the page
  - Error message text does not reveal which field is incorrect (security best practice)
  - User remains on login page (URL unchanged)
  - No sensitive information leaked in error message
- **Edge cases considered:**
  - SQL injection attempts (covered by not writing special characters)
  - Very long username/password strings
  - Special characters in credentials

## Not covered (and why)

- Logout flow — separate from login, covered in session management tests
- Remember me / persistent session — not visible on login page
- Password reset flow — separate user journey
- Social login / OAuth — not available on this application
- Browser autocomplete behavior — UI browser feature, not app responsibility
- Account creation / registration — separate flow
- Multi-factor authentication — not implemented in SauceDemo
