import { expect, describe, it } from 'vitest';
import { formatLogin } from './format-login';

const data = {
  login: 'admin',
  customName: 'dima',
};

describe('formatLogin', () => {
  describe('custom name provided', () => {
    describe('dog enabled', () => {
      it('formats with @customName', () => {
        const result = formatLogin(data.login, data.customName, true);

        expect(result.format).toBe('dima(@admin)');
        expect(result.name).toBe(data.customName);
      });
    });

    describe('dog disabled', () => {
      it('formats without @', () => {
        const result = formatLogin(data.login, data.customName, false);

        expect(result.format).toBe('dima(admin)');
        expect(result.name).toBe(data.customName);
      });
    });
  });

  describe('custom name missing', () => {
    it('falls back to login', () => {
      const result = formatLogin(data.login, undefined);

      expect(result.format).toBe('@admin');
      expect(result.name).toBe(data.login);
    });
  });

  describe('edge cases', () => {
    it('handles empty values safely', () => {
      const result = formatLogin('', undefined);

      expect(result.format).toBe('@');
      expect(result.name).toBe('');
    });
  });
});
