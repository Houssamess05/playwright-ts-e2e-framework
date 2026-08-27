import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Permite la ejecucion de los tests de APi al igual que los de E2E.
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Evita que se ejecute un test con .only en CI
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : [['html']], // Muestra el reporte en HTML y en GitHub Actions si se ejecuta en CI

  use: {
    testIdAttribute: 'data-qa', //Considera el atributo data-qa como id en vez de data-testid.
    baseURL: 'https://reqres.in', // Servirá para nuestras pruebas iniciales
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testDir: './tests/e2e', // Solo busca en tests/e2e
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api',
      testDir: './tests/api', // Directorio donde se encuentran los tests de API   
    }
    ],
});