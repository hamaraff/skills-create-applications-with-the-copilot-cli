const { add, sub, mul, div, modulo, power, squareRoot } = require('../lib/calculator');

describe('calculator library', () => {
  describe('addition', () => {
    test('adds 2 + 3 => 5 (image example)', () => {
      expect(add([2, 3])).toBe(5);
    });

    test('adds multiple numbers', () => {
      expect(add([1, 2, 3, 4])).toBe(10);
    });
  });

  describe('subtraction', () => {
    test('subtracts 10 - 4 => 6 (image example)', () => {
      expect(sub([10, 4])).toBe(6);
    });

    test('left associative with multiple args: 10 - 3 - 2 => 5', () => {
      expect(sub([10, 3, 2])).toBe(5);
    });

    test('throws when fewer than 2 args', () => {
      expect(() => sub([5])).toThrow(/at least two/);
    });
  });

  describe('multiplication', () => {
    test('multiplies 45 * 2 => 90 (image example)', () => {
      expect(mul([45, 2])).toBe(90);
    });

    test('product of many numbers', () => {
      expect(mul([2, 3, 4])).toBe(24);
    });
  });

  describe('division', () => {
    test('divides 20 / 5 => 4 (image example)', () => {
      expect(div([20, 5])).toBe(4);
    });

    test('left associative with multiple args: 100 / 2 / 5 => 10', () => {
      expect(div([100, 2, 5])).toBe(10);
    });

    test('throws on division by zero', () => {
      expect(() => div([10, 0])).toThrow(/Division by zero/);
      expect(() => div([100, 2, 0, 5])).toThrow(/Division by zero/);
    });

    test('throws when fewer than 2 args', () => {
      expect(() => div([5])).toThrow(/at least two/);
    });
  });

  describe('input validation', () => {
    test('throws on invalid number inputs', () => {
      expect(() => add(['a', 1])).toThrow(/Invalid number/);
      expect(() => sub(['b', 1])).toThrow(/Invalid number/);
    });

    test('throws when no args provided', () => {
      expect(() => add([])).toThrow(/No numeric arguments provided/);
    });
  });

  describe('extended operations', () => {
    test('modulo with 5 % 2 => 1 (image example)', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('power with 2 ^ 3 => 8 (image example)', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('square root of 16 => 4 (image example)', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('modulo by zero throws', () => {
      expect(() => modulo(10, 0)).toThrow(/Division by zero/);
    });

    test('power supports negative exponent', () => {
      expect(power(2, -1)).toBeCloseTo(0.5);
    });

    test('square root of negative number throws', () => {
      expect(() => squareRoot(-4)).toThrow(/negative/);
    });
  });
});
