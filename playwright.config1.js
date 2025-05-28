// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 720, height: 720 },
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        permissions: ['geolocation'], // Allow geolocation permissions
        video: 'retain-on-failure'
      },
    }
  ]
});

