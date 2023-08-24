import { getRandomId } from './utils';

describe('utils', () => {
  /**
   * Test for the getRandomId function using Jest.
   */
  describe('getRandomId', () => {
    it('should return a string', () => {
      expect(typeof getRandomId()).toBe('string');
    });

    it('should return a string with length 10', () => {
      expect(getRandomId().length).toBe(10);
    });

    it('should return a string starting with _', () => {
      expect(getRandomId()[0]).toBe('_');
    });

    // Test that the result is really random.
    it('should return different strings', () => {
      expect(getRandomId()).not.toBe(getRandomId());
    });
  });
});
