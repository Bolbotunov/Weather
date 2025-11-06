import '@testing-library/jest-dom';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

jest.mock('@/config/env', () => ({
  API_KEY: 'mock-weather-key',
  GOOGLE_KEY: 'mock-google-key',
  GOOGLE_ID: 'mock-client-id',
}));
