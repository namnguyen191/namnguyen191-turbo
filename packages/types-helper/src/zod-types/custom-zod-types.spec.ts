import { ZodNonEmptyPrimitive, ZodObjectType } from './custom-zod-types.js';

describe('Custom zod types', () => {
  describe('ZodNonEmptyPrimitive', () => {
    it('should parse js primitive value', () => {
      const primitives: unknown[] = ['test', 1, true, Symbol('test'), BigInt(9007199254740991)];

      primitives.forEach((pri) => ZodNonEmptyPrimitive.parse(pri));
    });

    it('should throw error for empty js primitive value', () => {
      const emptyPrimitives: unknown[] = [null, undefined];

      for (const pri of emptyPrimitives) {
        expect(() => ZodNonEmptyPrimitive.parse(pri)).toThrowError();
      }
    });

    it('should throw error for non primitive value', () => {
      expect(() => ZodNonEmptyPrimitive.parse({ name: 'Nam' })).toThrowError();
    });
  });

  describe('ZodObjectType', () => {
    it('should parse object', () => {
      ZodObjectType.parse({
        name: 'test',
      });
    });

    it('should throw error for non-object value', () => {
      const nonObjects: unknown[] = [
        'test',
        1,
        true,
        Symbol('test'),
        BigInt(9007199254740991),
        new Array(1),
      ];

      for (const nonOb of nonObjects) {
        expect(() => ZodObjectType.parse(nonOb)).toThrowError();
      }
    });
  });
});
