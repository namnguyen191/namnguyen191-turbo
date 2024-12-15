import z from 'zod';

import { parseZodWithDefault } from './utils.js';

describe('utils', () => {
  describe('parseZodWithDefault', () => {
    it('should return value if it pass parser', () => {
      const testVal = 'test string';
      const parsedVal = parseZodWithDefault(z.string(), testVal, 'default');
      expect(parsedVal).toEqual(testVal);
    });

    it('should return default value if it did not pass parser', () => {
      const testVal = 1;
      const testDefault = 'default string';
      const consoleWarnSpy = vi.spyOn(console, 'warn');
      const parsedVal = parseZodWithDefault(z.string(), testVal, testDefault);
      expect(parsedVal).toEqual(testDefault);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });
});
